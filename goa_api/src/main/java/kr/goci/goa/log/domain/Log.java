package kr.goci.goa.log.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

public class Log {

    @Entity
    @Data
    @NoArgsConstructor
    @ToString
    public static class Down {
        @Id
        @GeneratedValue
        private Long id;
        private String hash;
        private String ip;
        @Temporal(TemporalType.TIMESTAMP)
        private Date date;
    }

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Products {
        @Id
        @GeneratedValue
        private Long id;
        private String hashcode;
        private String path;
        private String filename;
        private String productname;
        private String type;
        private String outputtype;
        @Temporal(TemporalType.TIMESTAMP)
        private Date date;
    }
}
