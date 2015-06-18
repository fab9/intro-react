var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

var ShoppingItemRow = React.createClass({
    render: function() {
        return React.DOM.li({},
            React.DOM.ul({},
                // this.props here come from our top level render call
                React.DOM.li({className: 'name'}, this.props.item.name),
                React.DOM.li({className: 'quantity'}, this.props.item.quantity),
                React.DOM.li({className: 'price'},
                    priceToUSDString(this.props.item.price)
                )
            )
        );
    }
});
var ShoppingItemRowComponent = React.createFactory(ShoppingItemRow);

var ShoppingTotal = React.createClass({
    render: function() {
        var total = 0;
        var item;
        for (var itemNum in this.props.items) {
            item = this.props.items[itemNum];
            total += item.price;
        }

        return React.DOM.ul({className: 'total'},
            React.DOM.li({}, "Total"),
            React.DOM.li({}, priceToUSDString(total))
        );
    }
});
var ShoppingTotalComponent = React.createFactory(ShoppingTotal);

// Component code
var ShoppingList = React.createClass({
    render: function() {
        // Map over our sample data and for each of those rows in that array
        var itemRows = this.props.items.map(function(item) {
            // return a different component, pass some things in
            return ShoppingItemRowComponent({item: item, key: item.name});
        });

        // Return a div with an ordered list in it
        // Using the shortcut`React.DOM`, same as `React.createElement`
        return React.DOM.div({}, // Empty attributes argument
            // First arg is options, things that will be attributes in the rendered DOM
            // Arg (the ol) will become a child
            React.DOM.ol({className: "items"},
                // Call variable declared earlier
                itemRows
            ),
            // This second arg will also become a child
            ShoppingTotalComponent({items: this.props.items})
        );
    }
});

// You only need to do this if you're not using JSX.
// It turns our class into a thing that is callable in a way that react likes.
var ShoppingListComponent = React.createFactory(ShoppingList);

// Sample data
var itemList = [
    {
        name: 'Sleeping Bag w/ Stuff Sack',
        quantity: 1,
        price: 44.99
    },
    {
        name: 'Chocolate Energy Bar',
        quantity: 4,
        price: 2.99 * 4
    },
    {
        name: '2-Person Polyethylene Tent',
        quantity: 1,
        price: 104.33
    }
];

// Top level render call
// Pass it a component (?prop called itemsand a DOM node where you want to drop the component
React.render(ShoppingListComponent({items: itemList}),
             document.getElementById('here'));
