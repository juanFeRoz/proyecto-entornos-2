package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ShoppingCartDto;
import org.example.backend.service.ProductService;
import org.example.backend.service.ShoppingCartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/shoppingcart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ShoppingCartDto> getShoppingCart() {
        ShoppingCartDto shoppingCartDto = new ShoppingCartDto();
        shoppingCartDto.setProducts(shoppingCartService.getProductsInCart());
        shoppingCartDto.setTotal(shoppingCartService.getTotal());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(shoppingCartDto);
    }

    @GetMapping("/addproduct/{name}")
    public ResponseEntity<ShoppingCartDto> addProduct(@PathVariable String name) {
        shoppingCartService.addProduct(productService.findByName(name));
        return getShoppingCart();
    }

    @GetMapping("/removeproduct/{name}")
    public ResponseEntity<ShoppingCartDto> removeProduct(@PathVariable String name) {
        shoppingCartService.removeProduct(productService.findByName(name));
        return getShoppingCart();
    }
}
