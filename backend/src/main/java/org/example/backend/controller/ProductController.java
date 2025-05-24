package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Product;
import org.example.backend.service.ProductService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Iterable<Product>> getAllProducts() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productService.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Product> getProductByName(@PathVariable String name) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productService.findByName(name));
    }
    @GetMapping("/search/{name}")
    public ResponseEntity<Iterable<Product>> searchProductByName(@PathVariable String name) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productService.searchByName(name));
    }
}
