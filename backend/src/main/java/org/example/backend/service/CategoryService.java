package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.NotFoundException;
import org.example.backend.model.Category;
import org.example.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findByName(String name) {
        return categoryRepository
                .findByName(name)
                .orElseThrow(NotFoundException::new);
    }
}
