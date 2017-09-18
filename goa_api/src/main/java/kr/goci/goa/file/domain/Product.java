package kr.goci.goa.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by sonbyeonghwa on 2017. 9. 18..
 */
@Entity
@Data
public class Product {
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
    private String productId;
    private String outputType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public Product(String path, String name, String filedate, int startX, int startY, int endX, int endY, String type, String productId, String outputType, Date date) {
        this.path = path;
        this.name = name;
        this.filedate = filedate;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.type = type;
        this.productId = productId;
        this.outputType = outputType;
        this.date = date;
    }
}
