package org.example.backend.controller;

import org.example.backend.exception.ErrorDetail;
import org.example.backend.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDetail> handleNotFoundException() {
        ErrorDetail errorDetail = new ErrorDetail();
        errorDetail.setMessage("Not found");
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorDetail);

    }
}
