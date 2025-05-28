-- Categorías
INSERT INTO category(name)
VALUES 
  ('Estilo Boho'),         
  ('Estilo Clasico'),      
  ('Estilo Industrial'),   
  ('Estilo Minimalista'),  
  ('Estilo Moderno'),      
  ('Estilo Nordico'), 
  ('Estilo Rustico'), 
  ('Estilo Art Deco'), 
  ('Estilo Escandinavo'); 

INSERT INTO product(name, price, image, category_id)
VALUES 
  ('Espejo Redondo Minimalista 60 Cm', 89900, 'https://media.falabella.com/sodimacPE/2571773_02/w=800,h=800,fit=pad', 4),
  ('Espejo Alto Moderno 40x160 Cm', 129900, 'https://m.media-amazon.com/images/I/7171bk29lIL._AC_UF894,1000_QL80_.jpg', 5),
  ('Espejo Decorativo Vintage 70x90 Cm', 109900, 'https://media.falabella.com/sodimacCO/309475_09/w=800,h=800,fit=pad', 2),
  ('Espejo Industrial Marco Negro 50x150 Cm', 139900, 'https://bylmo.com/cdn/shop/files/1011068-espejo-visee-ovalado-negro-50x150cm-con-marco-metlico_2.png?v=1717521796&width=1500', 3),
  ('Espejo Estilo Boho con Cuerda 45 Cm', 74900, 'https://i.etsystatic.com/27694957/r/il/a13385/2926104664/il_570xN.2926104664_8jxk.jpg', 1),
  ('Espejo Moderno sin Marco 60x120 Cm', 119900, 'https://bylmo.com/cdn/shop/files/1012307-espejo-led-asimtrico-de-pared-moderno-50x150cm-sin-marco_3.png?v=1726795682&width=1500', 5),
  ('Espejo Redondo Nordico 50cm', 84900, 'https://d22fxaf9t8d39k.cloudfront.net/8f9005e9d9df82595628a53f134990fdfac24c2b060fc58dd1cb02bd2c8d865688233.jpeg', 6),
  ('Espejo Marco de Madera Rustico 70x100cm', 114900, 'https://m.media-amazon.com/images/I/81M6CKE0lTL._AC_SL1500_.jpg', 7),
  ('Espejo Art Deco Oro 60x90cm', 134900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8ZI5OxL_xjzxde3b_SqManKCHK7gkTKSiQ&s', 8),
  ('Espejo Escandinavo Ovalado 40x100cm', 99900, 'https://www.centroespejos.com/9229/espejo-ovalado-escandinavo-scandi-slim-cobre.jpg', 9),
  ('Espejo Alto Nordico 50x160cm', 139000, 'https://ae01.alicdn.com/kf/S119b8e44da7042288b967553dd57be3bR.jpg', 6),
  ('Espejo Rustico Marco Ancho 60x120cm', 124000, 'https://m.media-amazon.com/images/I/71Cs50kjwpL._AC_SL1500_.jpg', 7),
  ('Espejo Geometrico Art Deco 55cm', 119000, 'https://m.media-amazon.com/images/I/613h8aYrhaL.jpg', 8),
  ('Espejo Escandinavo Minimalista 45x90cm', 92000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoiJhq3hBQGkQDH9P_t59KEMhGlICcZpfGg&s', 9),
  ('Espejo Pared Rustico Cuadrado 70cm', 89000, 'https://i.etsystatic.com/8440485/r/il/d8b16e/3389468459/il_fullxfull.3389468459_8weu.jpg', 7),
  ('Espejo Decorativo Nordico con Marco Blanco 60cm', 93000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2VQtp4rYf13bnm1FTL5r0J9UimmRfBYr2Q&s', 6),
  ('Espejo Art Deco Plateado 70x110cm', 149000, 'https://i.etsystatic.com/25656182/r/il/2ceacc/4244756305/il_fullxfull.4244756305_8urb.jpg', 8);
