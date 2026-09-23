import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

# 1. Add const [quantity, setQuantity] = useState(1); right after selectedBundle
text = text.replace('const [selectedBundle, setSelectedBundle] = useState(() => {', 
                    'const [quantity, setQuantity] = useState(1);\n const [selectedBundle, setSelectedBundle] = useState(() => {')

# 2. Fix the quantity variables in the JSX (which I missed in update_hero.py because I was doing regex replacements)
# line 670: {selectedBundle.title} {quantity > 1 && `(x${quantity})`} &bull; Save ₹{((selectedBundle.mrp - ((isSubscription && selectedBundle.id === 'tcore-3-bottles') ? selectedBundle.subPrice : selectedBundle.price)) * quantity).toLocaleString('en-IN')}
text = re.sub(r'\{selectedBundle\.title\}\s*\{quantity > 1 && `\(x\$\{quantity\}\)`\}\s*&bull;\s*Save ₹\{\(\(selectedBundle\.mrp - \(\(isSubscription && selectedBundle\.id === \'tcore-3-bottles\'\) \? selectedBundle\.subPrice : selectedBundle\.price\)\) \* quantity\)\.toLocaleString\(\'en-IN\'\)\}',
              r'{selectedBundle.title} {quantity > 1 && `(x${quantity})`} &bull; Save ₹{(cartMapping.finalMrp - cartMapping.finalPrice).toLocaleString(\'en-IN\')}', text)

# line 777: <div className="text-xs font-black uppercase text-white tracking-wide">{selectedBundle.title} {quantity > 1 && `(x${quantity})`}</div>
# wait, quantity is now defined! So I don't need to remove it from the UI! The user WANTS to see it!
# I just need to replace `bundle.price * quantity` with `cartMapping.finalPrice` where I missed it.
# Wait, I already replaced it! Let's check why `quantity is not defined` was thrown.
# It was thrown because `const [quantity, setQuantity] = useState(1);` was missing!

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

