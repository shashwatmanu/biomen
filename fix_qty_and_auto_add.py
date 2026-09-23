import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

# 1. Remove const [quantity, setQuantity] = useState(1);
text = re.sub(r'const \[quantity, setQuantity\] = useState\(1\);\n?', '', text)

# 2. Add currentBottleCount helper right after selectedBundle
bottle_count_code = """
 const currentBottleCount = selectedBundle.id === 'tcore-3-bottles' ? 3 : selectedBundle.id === 'tcore-2-bottles' ? 2 : 1;
 
 useEffect(() => {
   const params = new URLSearchParams(window.location.search);
   const system = params.get('system');
   if (system && bundles.length > 0) {
     const matched = bundles.find(b => b.id === system);
     if (matched && matched.shopifyVariantId) {
       // Only auto-add if it hasn't been added in this session to prevent reload loops
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
         // Clean URL
         window.history.replaceState({}, document.title, window.location.pathname);
       }
     }
   }
 }, [bundles]);
"""
text = text.replace('const [isStickyVisible, setIsStickyVisible] = useState(false);', 'const [isStickyVisible, setIsStickyVisible] = useState(false);\n' + bottle_count_code)

# 3. Replace the + and - buttons logic
minus_button = """onClick={() => {
     if (selectedBundle.id === 'tcore-3-bottles') setSelectedBundle(bundles.find(b => b.id === 'tcore-2-bottles') || bundles[1]);
     else if (selectedBundle.id === 'tcore-2-bottles') setSelectedBundle(bundles.find(b => b.id === 'tcore-1-bottle') || bundles[0]);
     }}"""
text = re.sub(r'onClick=\{\(\) => \{\s*if \(quantity > 1\) setQuantity\(quantity - 1\);\s*\}\}', minus_button, text)

plus_button = """onClick={() => {
     if (selectedBundle.id === 'tcore-1-bottle') setSelectedBundle(bundles.find(b => b.id === 'tcore-2-bottles') || bundles[1]);
     else if (selectedBundle.id === 'tcore-2-bottles') setSelectedBundle(bundles.find(b => b.id === 'tcore-3-bottles') || bundles[2]);
     }}"""
text = re.sub(r'onClick=\{\(\) => setQuantity\(quantity \+ 1\)\}', plus_button, text)

# 4. Replace {quantity} display with {currentBottleCount}
text = re.sub(r'<span className="text-\[\#F4F6F2\] text-xs font-black w-4 text-center select-none">\s*\{quantity\}\s*</span>', 
              '<span className="text-[#F4F6F2] text-xs font-black w-4 text-center select-none">{currentBottleCount}</span>', text)

# 5. Replace quantity: quantity in addToCart with quantity: 1
text = re.sub(r'quantity:\s*quantity,', 'quantity: 1,', text)

# 6. Fix reset quantity on bundle change (we don't need it anymore)
text = re.sub(r'setQuantity\(1\); // Reset quantity on bundle change\n?', '', text)

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

