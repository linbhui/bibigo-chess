// Piece Creation
function createPiece(number, pieceType, color, imageURL, imgName, link) {
    let pieceGroup = [];
    for (let i = 0; i < number; i++) {
        // Creating the piece element
        let pieceDiv = document.createElement('div');
        pieceDiv.classList.add('piece', pieceType);
        pieceDiv.setAttribute('team', color);
        pieceDiv.setAttribute('productLink', link)
        pieceDiv.id = `${color}${pieceType}${i+1}`;

        // Creating the image element
        let image = document.createElement('img');
        image.src = imageURL;
        image.alt = imgName;
        image.title = imgName;

        // Add image as piece's child
        pieceDiv.appendChild(image);

        //Add piece to the group
        pieceGroup.push(pieceDiv);
    }
    return pieceGroup;
}

const king1 = createPiece('1', 'king', 'white', 'https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/05/대지-1.png.webp', 'Soy Honey Chicken', 'https://bibigo.eu/en/product/soy-honey-fried-chicken/');
const queen1 = createPiece('1','queen','white','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/10/bibigo_Sliced-Napa-Cabbage-Kimchi-500g.png.webp','Sliced Kimchi','https://bibigo.eu/en/product/sliced-napa-cabbage-kimchi-jar/');
const rook1 = createPiece('2','rook','white','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/10/136362_BIBIGO-CRISPY-SEAWEED-SNACKS-ORIGINAL-5G-small.png.webp','Sesame Seaweed','https://bibigo.eu/en/product/crispy-seaweed-snacks-bbq/');
const bishop1 = createPiece('2','bishop','white','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/10/bibigo_Tteokbokki-Pouch_SweetSpicy.png.webp','Tteokbokki','https://bibigo.eu/en/product/tteokkbokki-sweet-and-spicy-pouch/');
const knight1 = createPiece('2','knight','white','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/05/Gochujang-500g_Draft-small.png.webp','Go-ChuJang','https://bibigo.eu/en/product/go-chu-jang-2/');
const pawn1 = createPiece('8','pawn','white','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/05/bibigo_Gyoza-Kimchi-Chicken-300g.png.webp','Kimchi Gyoza','https://bibigo.eu/en/product/kimchi-chicken-gyoza/');

const king2 = createPiece('1', 'king', 'black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2025/01/bibigo-Tofu-Firm.png.webp','Firm Tofu','https://bibigo.eu/en/product/tofu-firm/');
const queen2 = createPiece('1','queen','black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/05/%EB%8C%80%EC%A7%80-1-1.png.webp','Vegan Kimchi','https://bibigo.eu/en/product/plantable-vegan-kimchi/');
const rook2 = createPiece('2','rook','black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/10/136415_BIBIGO-CRISPY-SEAWEED-SNACKS-WASABI-5G-small.png.webp','Crispy Seaweed','https://bibigo.eu/en/product/crispy-seaweed-snacks-wasabi/');
const bishop2 = createPiece('2','bishop','black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/10/bibigo_MW-Steamed-Dumplings-Green-Chili.png.webp','Steamed Dumplings','https://bibigo.eu/en/product/green-chilli/');
const knight2 = createPiece('2','knight','black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/05/Ssamjang-500G-small.png.webp','Ssam-Jang','https://bibigo.eu/en/product/ssam-jang/');
const pawn2 = createPiece('8','pawn','black','https://bibigo.eu/wp-content/webp-express/webp-images/uploads/2024/11/bibigo_Mandu-Korean-Chive-Vege.png.webp','Vegan Mandu','https://bibigo.eu/en/product/plant-based-mandu-korean-chive-vegetables-2/');

