const { Client } = require("pg");
require("dotenv").config();
// console.log(process)
const SQL =
    `CREATE TABLE IF NOT EXISTS firearms (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255),category VARCHAR(255),caliber VARCHAR(255),serial_number VARCHAR(20w),price DECIMAL(10,2), quantity_in_stock INT, description VARCHAR(255) ); 
    
    INSERT INTO firearms (name, category, caliber, serial_number, price, quantity_in_stock, description) VALUES
('Colt 1911', 'Pistol', '0.45 ACP', 'C1911-001', 899.99, 15, 'A classic American pistol known for its reliability and stopping power.'),
('Remington 700', 'Rifle', '7.62x51mm NATO', 'R700-007', 1199.95, 10, 'A versatile and accurate bolt-action rifle, popular among hunters and sharpshooters.'),
('Benelli M4', 'Shotgun', '12 Gauge', 'B004-123', 1399.99, 8, 'A semi-automatic shotgun known for its reliability and ruggedness.'),
('Glock 19', 'Pistol', '9mm', 'G19-987', 649.00, 25, 'A compact 9mm pistol favored for its balance between size, capacity, and performance.'),
('AR-15', 'Rifle', '5.56x45mm NATO', 'AR15-555', 999.00, 20, 'A versatile and customizable semi-automatic rifle, popular for both sport shooting and self-defense.'),
('Mossberg 500', 'Shotgun', '12 Gauge', 'M500-321', 479.99, 30, 'A reliable pump-action shotgun, suitable for hunting, home defense, and tactical applications.'),
('Winchester Model 70', 'Rifle', '30-06 Springfield', 'W70-204', 1099.99, 12, 'A well-regarded bolt-action rifle known for its accuracy and durability, popular among big-game hunters.'),
('Sig Sauer P320', 'Pistol', '9mm', 'S320-456', 699.00, 18, 'A modular 9mm pistol offering a customizable grip and frame system, favored for its ergonomics and safety features.');

    `

async function main() {
    console.log("seeding");

    const client = new Client({
        connectionString: "postgresql://mssskrishna:shanmukha@734@localhost:5432/inventory"
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();