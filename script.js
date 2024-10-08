class VirtualScroller {
    constructor(container, itemHeight, totalItems, renderItem) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.totalItems = totalItems;
        this.renderItem = renderItem;

        this.visibleItems = Math.ceil(container.clientHeight / itemHeight) + 1;
        this.startIndex = 0;
        this.endIndex = this.visibleItems;

        this.content = document.createElement('div');
        this.content.style.height = `${totalItems * itemHeight}px`;
        this.content.style.position = 'relative';
        this.container.appendChild(this.content);

        this.container.addEventListener('scroll', this.onScroll.bind(this));
        this.render();
    }

    onScroll() {
        const scrollTop = this.container.scrollTop;
        this.startIndex = Math.floor(scrollTop / this.itemHeight);
        this.endIndex = this.startIndex + this.visibleItems;
        this.render();
    }

    render() {
        this.content.innerHTML = '';
        let newInnerHTML = '';
        for (let i = this.startIndex; i < Math.min(this.endIndex, this.totalItems); i++) {
            const item = this.renderItem(i);
            item.style.position = 'absolute';
            item.style.top = `${i * this.itemHeight}px`;
            newInnerHTML += item.outerHTML;
        }
        this.content.innerHTML = newInnerHTML;
    }
}

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