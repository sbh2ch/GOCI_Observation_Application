package kr.goci.goa.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import org.springframework.hateoas.ResourceSupport;

public class ProductDto {
    @Data
    @ToString
    public static class Create {
        private String startX;
        private String startY;
        private String endX;
        private String endY;
        private String date;
        private String type;
        private String outputType;
    }

    @Data
    @AllArgsConstructor
    public static class Response extends ResourceSupport {
        private String name;
    }
}
