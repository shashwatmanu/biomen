import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

# 1. Extract the rogue code block
pattern = r" const currentBottleCount = selectedBundle\.id === 'tcore-3-bottles' \? 3 : selectedBundle\.id === 'tcore-2-bottles' \? 2 : 1;\n \n useEffect\(\(\) => \{\n   const params = new URLSearchParams.*?\}, \[bundles\]\);\n"
match = re.search(pattern, text, re.DOTALL)
if match:
    rogue_code = match.group(0)
    text = text.replace(rogue_code, "")
    
    # Insert it right before "const handleMouseMove" which is safely after selectedBundle, bundles, images
    # wait, images is defined after handleMouseMove!
    # I should move `const images = [...]` to the top, inside the component, right below `const sliderRef`
    pass

# Instead of regex surgery, let's do simple replaces
# Remove rogue code
text = re.sub(r" const currentBottleCount = selectedBundle\.id === 'tcore-3-bottles'.*?\}, \[bundles\]\);\n", "", text, flags=re.DOTALL)

# Find where selectedBundle is defined
selected_bundle_idx = text.find('return matched || bundles[0]; // defaults to 1 Bottle (which is bundles[0])\n });')

# The end of selectedBundle definition:
insert_pos = text.find('});', selected_bundle_idx) + 3

rogue_code = """
  const images = [
    { id: 'prod-1', url: '/Product/1.jpeg', label: 'T-CORE Front View' },
    { id: 'prod-2', url: '/Product/2.jpeg', label: 'T-CORE Side View' },
    { id: 'prod-3', url: '/Product/3.jpeg', label: 'T-CORE Supplement Facts' },
    { id: 'prod-4', url: '/Product/4.jpeg', label: 'T-CORE Texture Detail' },
    { id: 'prod-5', url: '/Product/5.jpeg', label: 'T-CORE Ingredients Close-up' },
  ];

  const currentBottleCount = selectedBundle.id === 'tcore-3-bottles' ? 3 : selectedBundle.id === 'tcore-2-bottles' ? 2 : 1;
 
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

# Insert rogue_code after selectedBundle
text = text[:insert_pos] + "\n" + rogue_code + text[insert_pos:]

# Remove the old `const images = [...]`
text = re.sub(r'  const images = \[\n.*?  \];\n', '', text, flags=re.DOTALL)

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

