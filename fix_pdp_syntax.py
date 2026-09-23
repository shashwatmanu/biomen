import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

# Line 551: quantity={isSelected ? quantity : 1} -> quantity={1}
text = re.sub(r'quantity=\{isSelected \? quantity : 1\}', 'quantity={1}', text)

# Line 616: {selectedBundle.title} {quantity > 1 && `(x${quantity})`} &bull; Save ₹{((selectedBundle.mrp - ((isSubscription && selectedBundle.id === 'tcore-3-bottles') ? selectedBundle.subPrice : selectedBundle.price)) * quantity).toLocaleString('en-IN')}
text = re.sub(r'\{selectedBundle\.title\}\s*\{quantity > 1 && `\(x\$\{quantity\}\)`\}\s*&bull;', '{selectedBundle.title} &bull;', text)
text = re.sub(r'\)\s*\*\s*quantity\)\.toLocaleString', ')).toLocaleString', text)

# Line 723: <div className="text-xs font-black uppercase text-white tracking-wide">{selectedBundle.title} {quantity > 1 && `(x${quantity})`}</div>
text = re.sub(r'\{selectedBundle\.title\}\s*\{quantity > 1 && `\(x\$\{quantity\}\)`\}', '{selectedBundle.title}', text)

# Line 742: ₹{(selectedBundle.mrp * quantity).toLocaleString('en-IN')}
text = re.sub(r'\(selectedBundle\.mrp \* quantity\)\.toLocaleString', '(selectedBundle.mrp).toLocaleString', text)

# Line 745: ₹{((isSubscription ? selectedBundle.subPrice : selectedBundle.price) * quantity).toLocaleString('en-IN')}
text = re.sub(r'\* quantity\)\.toLocaleString', ').toLocaleString', text)

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

