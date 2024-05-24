let products = [];
let productId = 1;

function createProduct() {
	const productName = document.querySelector("#productName").value;
	const price = document.querySelector("#price").value;
	const image = document.querySelector("#image").value;

	if (isNaN(price) || price <= 0) {
		alert('Price must be a positive number.');
		return;
	}

	if (!/\.(jpg|png|gif)$/i.test(image)) {
		alert('Image URL must be a valid file (jpg, png, gif).');
		return;
	}

	const product = {
		id: productId++,
		name: productName,
		price: parseFloat(price).toFixed(2),
		image: image,
	};

	products.push(product);

	renderProduct(product);

	document.querySelector("#productForm").reset();
}

function renderProduct(product) {
	const productList = document.querySelector("#productList");

	const productItem = document.createElement("div");
	productItem.className =
		"p-4 bg-white rounded-lg shadow-md flex items-center space-x-4";

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.className = "form-checkbox h-5 w-5 accent-pink-600 ";
	checkbox.addEventListener("change", updateTotalValue);


	const img = document.createElement("img");
	img.src = product.image;
	img.alt = product.name;
	img.className = "w-16 h-16 object-cover rounded-lg";

	const productDetails = document.createElement("div");
	productDetails.className = "flex-1";

	const productName = document.createElement("h3");
	productName.className = "text-lg font-semibold";
	productName.textContent = product.name;
	const productPrice = document.createElement("p");
	productPrice.className = "text-gray-500";
	productPrice.textContent = `Price: $${product.price}`;

	productDetails.appendChild(productName);
	productDetails.appendChild(productPrice);

	productItem.appendChild(checkbox);
	productItem.appendChild(img);
	productItem.appendChild(productDetails);

	productList.appendChild(productItem);

}

function addToCart() {
	const cartList = document.querySelector("#cartList");
	const productItems = document.querySelectorAll("#productList > div");
    
	productItems.forEach((item) => {
		const checkbox = item.querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			checkbox.removeEventListener("change", updateTotalValue);
			cartList.appendChild(item);
		}
	});
    updateTotalValue();
}

function updateTotalValue() {
	let totalValue = 0;
	const productItems = document.querySelectorAll("#cartList > div");

	productItems.forEach((item) => {
		const checkbox = item.querySelector('input[type="checkbox"]');
		if (checkbox.checked) {
			const Price = parseFloat(
				item
					.querySelector("p:nth-child(2)")
				 .textContent.replace("Price: $", "")
			);
            
			totalValue += Price;
            
		}
	});

	const formattedTotalValue = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(totalValue);

	document.querySelector("#totalValue").textContent = formattedTotalValue;
}

