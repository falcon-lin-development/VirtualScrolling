
// Usage
const container = document.getElementById('list-container');
const itemHeight = 50;
const totalItems = 10000;

const renderItem = (index) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.textContent = `Item ${index + 1}`;
    return item;
};

new VirtualScroller(container, itemHeight, totalItems, renderItem);