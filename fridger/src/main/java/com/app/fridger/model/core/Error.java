package com.app.fridger.model.core;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Error {
    private int code;
    private String time;
    private String message;
    private String method;
    private String path;
}
