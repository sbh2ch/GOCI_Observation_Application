package kr.goci.goa.file.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Image {
    public Image() {
    }

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

    public Image(String path, String name, String filedate, int startX, int startY, int endX, int endY, String type, String hashcode, Date date) {
        this.path = path;
        this.name = name;
        this.filedate = filedate;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.type = type;
        this.hashcode = hashcode;
        this.date = date;
    }
}
