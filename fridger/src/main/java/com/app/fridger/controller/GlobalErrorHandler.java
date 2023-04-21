package com.app.fridger.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.ZoneId;

@RestControllerAdvice
@Log4j2
public class GlobalErrorHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Error handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        StringBuilder errorMessageSb = new StringBuilder();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();

            errorMessageSb.append(String.format("field: %s - %s \n", fieldName, errorMessage));
        });

        return Error.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .time(LocalDateTime.now().atZone(ZoneId.systemDefault()).toString())
                .message(errorMessageSb.toString())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();
    }

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error handleDataAccessException(DataAccessException e, HttpServletRequest request) {
        log.error("Data Access Exception handled in global exception handler: " + e);
        e.printStackTrace();
//        Throwable cause = e.getCause();
//        while (cause != null &&cause.getCause() != null) {
//            cause = cause.getCause();
//        }
//        String message = cause == null ? e.getMessage() : cause.getMessage();


        return Error.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .time(LocalDateTime.now().atZone(ZoneId.systemDefault()).toString())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .method(request.getMethod())
                .build();
    }

}

@Data
@Builder
class Error {
    private int code;
    private String time;
    private String message;
    private String method;
    private String path;
}
