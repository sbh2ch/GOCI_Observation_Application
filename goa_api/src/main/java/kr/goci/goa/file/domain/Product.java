package kr.goci.goa.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.hateoas.ResourceSupport;

public class Product {
    @Data
    @AllArgsConstructor
    public static class Response extends ResourceSupport {
        private int startX;
        private int startY;
        private int endX;
        private int endY;
        private String date;
        private String type;
    }
}
