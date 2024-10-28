package com.app.fridger.client;

import com.app.fridger.model.api.spoonacular.GetRandomRecipesResponse;
import com.app.fridger.model.api.spoonacular.RecipeInformation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@Service
@Log4j2
public class SpoonacularClient {


    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    @Value("${spoonacular.api-key}")
    private String apiKey;

    private final static String URI = "https://api.spoonacular.com";

    public SpoonacularClient(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        restClient = RestClient.create();
    }

    public List<RecipeInformation> getRandomRecipes(int number) {
        URI uri = UriComponentsBuilder.fromHttpUrl(URI)
                .path("recipes/random")
                .queryParam("number", number)
                .build()
                .toUri();

        GetRandomRecipesResponse res = restClient.get()
                .uri(uri)
                .header("x-api-key", apiKey)
                .retrieve()
                .body(GetRandomRecipesResponse.class);

        try {
            objectMapper.writeValue(new File("random-recipe.json"), res);
        } catch (IOException e) {
            log.error("There was en error writing to file... " + e.getMessage());
        }

        return res.getRecipes();
    }

}
