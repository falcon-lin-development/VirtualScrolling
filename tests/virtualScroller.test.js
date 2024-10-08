import VirtualScroller from '../scripts/VirtualScroller';

describe('VirtualScroller', () => {
    let container;

    beforeEach(() => {
        // Create a mock container element
        container = document.createElement('div');
        container.id = 'list-container';
        container.style.height = '500px';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Clean up the DOM after each test
        document.body.innerHTML = '';
    });

    const setup = () => {
        const itemHeight = 50;
        const totalItems = 10000;
        const renderItem = (index) => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.textContent = `Item ${index + 1}`;
            return item;
        };

        return new VirtualScroller(container, itemHeight, totalItems, renderItem);
    };

    // test('VirtualScroller initializes correctly', () => {
    //     const scroller = setup();

    //     expect(scroller).toBeDefined();
    //     expect(scroller.visibleItems).toBe(Math.ceil(500 / 50) + 1);
    //     expect(scroller.startIndex).toBe(0);
    //     expect(scroller.endIndex).toBe(scroller.visibleItems);
    // });

    test('renders initial visible items', () => {
        setup();
        const visibleItems = container.querySelectorAll('.list-item');
        expect(visibleItems.length).toBeGreaterThan(0);
        expect(visibleItems.length).toBeLessThanOrEqual(Math.ceil(container.clientHeight / 50) + 1);
    });

    test('renders correct item content', () => {
        setup();
        const firstItem = container.querySelector('.list-item');
        expect(firstItem.textContent).toBe('Item 1');
    });

    test('updates items on scroll', () => {
        const scroller = setup();
        scroller.container.scrollTop = 500;
        scroller.onScroll();
        const itemAfterScroll = container.querySelector('.list-item');
        expect(itemAfterScroll.textContent).toBe('Item 11');
    });

    test('renders correct number of items after scroll', () => {
        const scroller = setup();
        scroller.container.scrollTop = 1000;
        scroller.onScroll();
        const visibleItems = container.querySelectorAll('.list-item');
        expect(visibleItems.length).toBeGreaterThan(0);
        expect(visibleItems.length).toBeLessThanOrEqual(Math.ceil(container.clientHeight / 50) + 1);
    });

    // test('scrolls to bottom', () => {
    //     const scroller = setup();
    //     const maxScroll = scroller.container.scrollHeight - scroller.container.clientHeight;
    //     scroller.container.scrollTop = maxScroll;
    //     scroller.onScroll();
    //     const lastItem = container.querySelector('.list-item:last-child');
    //     expect(lastItem.textContent).toBe('Item 10000');
    // });

    
    test('container has correct total height', () => {
        setup();
        const content = container.firstChild;
        expect(content.style.height).toBe('500000px'); // 10000 items * 50px height
    });
});