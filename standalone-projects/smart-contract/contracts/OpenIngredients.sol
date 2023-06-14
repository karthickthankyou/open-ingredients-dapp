// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract OpenIngredients is Initializable {
    address payable public contractOwner;
    uint public productCount;

    function initialize() public initializer {
        contractOwner = payable(msg.sender);
        productCount = 0;
    }

    struct Product {
        uint id;
        address payable owner;
        string name;
        string notes;
        uint quantity;
        uint price;
    }

    struct Ingredient {
        uint id;
        uint quantity;
    }

    mapping(uint => Product) public products;

    mapping(uint => uint[]) public productIngredients;
    mapping(address => mapping(uint => uint)) public userProducts;

    event ProductCreated();
    event ProductPurchased();

    function createProduct(
        string memory _name,
        string memory _notes,
        uint _price,
        Ingredient[] memory _ingredients
    ) public {
        for (uint i = 0; i < _ingredients.length; i++) {
            require(
                userProducts[msg.sender][_ingredients[i].id] >=
                    _ingredients[i].quantity,
                'Not enough ingredients in inventory'
            );
            userProducts[msg.sender][_ingredients[i].id] -= _ingredients[i]
                .quantity;
        }

        productCount++;
        products[productCount] = Product(
            productCount,
            payable(msg.sender),
            _name,
            _notes,
            1,
            _price
        );

        for (uint i = 0; i < _ingredients.length; i++) {
            productIngredients[productCount].push(_ingredients[i].id);
        }
    }

    function purchaseProduct(uint _productId, uint _quantity) public payable {
        Product storage _product = products[_productId];
        require(_product.quantity >= _quantity, 'Not enough product available');

        uint totalPrice = _product.price * _quantity;
        require(
            msg.value == totalPrice,
            'Incorrect value sent with transaction'
        );

        uint commission = totalPrice / 100;
        uint payment = totalPrice - commission;
        _product.owner.transfer(payment);
        contractOwner.transfer(commission);

        _product.quantity -= _quantity;
        userProducts[msg.sender][_productId] += _quantity;
    }
}
