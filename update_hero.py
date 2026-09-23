import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

# 1. Add auto-add useEffect
auto_add_code = """
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const system = params.get('system');
    if (system && bundles.length > 0) {
      const matched = bundles.find(b => b.id === system);
      if (matched && matched.shopifyVariantId) {
        if (!sessionStorage.getItem('autoAdded_' + system)) {
          sessionStorage.setItem('autoAdded_' + system, 'true');
          addToCart({
            id: matched.shopifyVariantId,
            title: `T-CORE ${matched.title} (${matched.name})`,
            price: matched.price,
            quantity: 1,
            isSubscription: false,
            image: images[0].url
          });
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
  }, [bundles]);
"""
# Find selectedBundle useState and insert auto_add_code
selected_bundle_idx = text.find('return matched || bundles[0]; // defaults to 1 Bottle (which is bundles[0])\n });')
insert_pos = text.find('});', selected_bundle_idx) + 3
text = text[:insert_pos] + "\n" + auto_add_code + text[insert_pos:]

# 2. Add dynamic pricing helper function
helper_code = """
  const getMappedCartItem = (bundle, qty) => {
    const b1 = bundles.find(b => b.id === 'tcore-1-bottle');
    const b2 = bundles.find(b => b.id === 'tcore-2-bottles');
    const b3 = bundles.find(b => b.id === 'tcore-3-bottles');

    let variantToUse = bundle;
    let variantQty = qty;
    let finalPrice = bundle.price * qty;
    let finalMrp = bundle.mrp * qty;

    if (bundle.id === 'tcore-1-bottle') {
      if (qty === 2 && b2) {
        variantToUse = b2;
        variantQty = 1;
        finalPrice = b2.price;
        finalMrp = b2.mrp;
      } else if (qty >= 3 && b3) {
        variantToUse = b3;
        variantQty = qty > 3 ? Math.floor(qty/3) : 1; // Simplify to 1 pack for qty=3
        finalPrice = b3.price * variantQty;
        finalMrp = b3.mrp * variantQty;
      }
    }
    return { variantToUse, variantQty, finalPrice, finalMrp };
  };

  const cartMapping = getMappedCartItem(selectedBundle, quantity);
"""
text = text[:insert_pos] + "\n" + helper_code + text[insert_pos:]

# 3. Fix quantity caps - prevent quantity > 3 for 1-bottle
text = re.sub(r'onClick=\{\(\) => setQuantity\(quantity \+ 1\)\}', 
              'onClick={() => { if (selectedBundle.id === \'tcore-1-bottle\' && quantity >= 3) return; setQuantity(quantity + 1) }}', text)

# 4. Replace occurrences of bundle.price * quantity with mapped prices
text = re.sub(r'selectedBundle\.price\s*\*\s*quantity', 'cartMapping.finalPrice', text)
text = re.sub(r'selectedBundle\.mrp\s*\*\s*quantity', 'cartMapping.finalMrp', text)

# 5. Fix AnimatedPricing props
text = re.sub(r'mrp=\{bundle\.mrp\}', 'mrp={isSelected ? cartMapping.finalMrp : bundle.mrp}', text)
text = re.sub(r'price=\{isSubscription && bundle\.id === \'tcore-3-bottles\' \? bundle\.subPrice : bundle\.price\}', 
              'price={isSelected ? cartMapping.finalPrice : bundle.price}', text)
text = re.sub(r'quantity=\{isSelected \? quantity : 1\}', 'quantity={1}', text) 

# 6. Update addToCart calls to use cartMapping
add_to_cart_code = """addToCart({
   id: cartMapping.variantToUse.shopifyVariantId || cartMapping.variantToUse.id,
   title: `T-CORE ${cartMapping.variantToUse.title} (${cartMapping.variantToUse.name})`,
   price: cartMapping.finalPrice / cartMapping.variantQty,
   quantity: cartMapping.variantQty,
   isSubscription: false,
   image: images[0].url
  })"""

text = re.sub(r'addToCart\(\{.*?image: images\[0\]\.url\s*\}\)', add_to_cart_code, text, flags=re.DOTALL)

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

