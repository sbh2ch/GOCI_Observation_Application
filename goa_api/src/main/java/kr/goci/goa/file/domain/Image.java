package kr.goci.goa.file.domain;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
public class Image {
    @Id
    @GeneratedValue
    private Long id;
    private String path;
    private String name;
    private String filedate;
    private int startX;
    private int startY;
    private int endX;
    private int endY;
    private String type;
    private String hashcode;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
