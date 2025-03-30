
const db = require('../db'); 
const fs = require("fs");
const path = require("path");


exports.getAllProduct = (req, res, next) => {
   

    const query = "SELECT id, title, description, image, price FROM products"; 

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

       
        const productsWithImages = results.map(product => ({ 
            ...product, 
           image_url: `http://localhost:8800/uploads/${product.image.replace('uploads/', '')}`
        }));
        
        

        res.status(200).json({
            status: 'success',
            products: productsWithImages
        });
    });
};


exports.addProduct = async (req, res, next) => {
   
    
    try {
       
        const productData = JSON.parse(req.body.product);
        
        if (!req.file) {
            return res.status(400).json({ message: 'Slika proizvoda je obavezna!' });
        }

   
        const imagePath = `${req.file.filename}`;
        productData.image = imagePath;

  
        const sql = `INSERT INTO products (title, description, image, price) VALUES (?, ?, ?, ?)`;
        const values = [productData.title, productData.description, imagePath, productData.price];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('❌ Greška pri dodavanju proizvoda:', err);
                return res.status(500).json({ message: 'Greška u serveru' });
            }

            res.status(200).json({
                status: 'success',
                message: 'Uspesno dodat proizvod',
                productId: result.insertId,
            });
        });

    } catch (error) {
        console.error('❌ Greška:', error);
        res.status(500).json({ message: 'Interna greška servera' });
    }
};

exports.singleProduct = async (req, res, next) => {
 
    const productId = req.params.productID; // Proveri da li je vrednost ovde ta
    

    const query = "SELECT id, title, description, image, price FROM products WHERE id = ?"; 

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('❌ Greška pri dobijanju proizvoda:', err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Proizvod nije pronađen" });
        }

        // Dodavanje punog URL-a za sliku
        const product = {
            ...result[0], 
            image_url: `http://localhost:8800/uploads/${result[0].image.replace('uploads/', '')}`
        };

        res.status(200).json({
            status: 'success',
            product
        });
    });
} 

exports.deleteSingleProduct = (req, res, next) => {
    const { productID, productImage } = req.params;

    if (!productID) {
        return res.status(400).json({ message: "Nedostaje ID proizvoda" });
    }

     
    // SQL upit za brisanje proizvoda iz baze
    const deleteQuery = "DELETE FROM products WHERE id = ?";
    
    db.query(deleteQuery, [productID], (err, result) => {
        if (err) {
            console.error("❌ Greška pri brisanju proizvoda:", err);
            return res.status(500).json({ message: "Greška u serveru" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Proizvod nije pronađen" });
        }

        // Ako postoji slika, brišemo je sa servera
        if (productImage) {
            const imagePath = path.join(__dirname, "..", "uploads", productImage);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("⚠️ Greška pri brisanju slike:", err);
                }
            });
        }

        res.status(200).json({ 
            status: "success",
            message: "Proizvod uspešno obrisan" 
        });
    });
}


exports.editProduct = (req, res, next) => {
    if (!req.body.product) {
        return res.status(400).json({ status: "error", message: "No product data provided" });
    }

    // Parsiranje JSON podataka iz frontenda
    const productData = JSON.parse(req.body.product);
    console.log(productData, 'productData iz backend-a');

    // Ako postoji nova slika, generiši putanju
    let imagePath = productData.image; // Zadrži staru ako nema nove slike
    if (req.file) {
        imagePath = `${req.file.filename}`;
        console.log(req.file.imagePath, 'req.file iz backend-a');
          
        // Ako postoji stara slika, možeš da je obrišeš (opciono)
        if (productData.oldImage && productData.oldImage !== imagePath) {
            const oldImagePath = path.join(__dirname, '../public', productData.oldImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Briše staru sliku
            }
        }
    }

    // **UPDATE upit u bazu** (prilagodi tabelu i kolone)
    const updateQuery = `
        UPDATE products
        SET title = ?, description = ?, price = ?, image = ?
        WHERE id = ?
    `;
    db.query(updateQuery, [
        productData.title,
        productData.description,
        productData.price,
        imagePath,
        productData.id
    ], (err, result) => {
        if (err) {
            console.error("❌ Greška pri ažuriranju proizvoda:", err);
            return res.status(500).json({ message: "Greška u serveru" });
        }

        res.status(200).json({ status: "success", message: "Product updated successfully!" });
    });
};
