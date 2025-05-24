package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Category;
import org.example.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Iterable<Category>> findAll() {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(categoryService.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Category> findByName(@PathVariable String name) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(categoryService.findByName(name));
    }
}
