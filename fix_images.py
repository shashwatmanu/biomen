import re

with open('src/components/pdp/HeroBuyBox.jsx', 'r') as f:
    text = f.read()

images_code = """
  const images = [
    { id: 'prod-1', url: '/Product/1.jpeg', label: 'T-CORE Front View' },
    { id: 'prod-2', url: '/Product/2.jpeg', label: 'T-CORE Side View' },
    { id: 'prod-3', url: '/Product/3.jpeg', label: 'T-CORE Supplement Facts' },
    { id: 'prod-4', url: '/Product/4.jpeg', label: 'T-CORE Texture Detail' },
    { id: 'prod-5', url: '/Product/5.jpeg', label: 'T-CORE Ingredients Close-up' },
  ];
"""

text = text.replace("const currentBottleCount =", images_code + "\n  const currentBottleCount =")

with open('src/components/pdp/HeroBuyBox.jsx', 'w') as f:
    f.write(text)

