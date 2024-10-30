package com.app.fridger.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

@Service
@Log4j2
@RequiredArgsConstructor
public class FileService {

    private final ResourceLoader resourceLoader;

    public void writeFileToResourceFolder(String fileName, String content) {
        try {
            Resource resource = resourceLoader.getResource("classpath:" + fileName);
            try (BufferedWriter writer = new BufferedWriter(new FileWriter((resource.getFile())))) {
                writer.write(content);
            }
        } catch (IOException e) {
            log.error("Error occurred during writing to file: " + e.getMessage());
        }
    }
}
