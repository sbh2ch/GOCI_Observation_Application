package kr.goci.goa.file.service;

import kr.goci.goa.file.domain.Image;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Slf4j
public class FileService {
    private String SERVER_NAME = "http://localhost:8080";


    public byte[] displayImage(String path, String name) throws IOException {
        File image = new File("E:GOA_TEMP/" + path.replaceAll("-", "/") + "/" + name + ".JPG");
        byte[] result = Files.readAllBytes(image.toPath());
        log.info("path : {}, name : {}", path, name);

        return result;
    }

    public Image.Response makeImage(Image.Create image) throws IOException {
        Image.Response responseImage = new Image.Response();
        String[] dates = image.getDate().split("-");

        System.out.println("E:\\GOA\\" + dates[0] + "\\" + dates[1] + "\\" + dates[2] + "\\" + dates[3] + "\\COMS_GOCI_L2A_GA_" + dates[0] + dates[1] + dates[2] + dates[3] + "." + image.getType() + ".BI.JPG");
        BufferedImage originalImage = ImageIO.read(new File("E:\\GOA\\" + dates[0] + "\\" + dates[1] + "\\" + dates[2] + "\\" + dates[3] + "\\COMS_GOCI_L2A_GA_" + dates[0] + dates[1] + dates[2] + dates[3] + "." + image.getType() + ".BI.JPG"));
        BufferedImage outputImage = originalImage.getSubimage(image.getStartX(), image.getStartY(), image.getEndX() - image.getStartX(), image.getEndY() - image.getStartY());

        String[] now = new SimpleDateFormat("yyyy-MM-dd-ssSSS").format(new Date()).split("-");
        String filePath = now[0] + "/" + now[1] + "/" + now[2];
        String fileName = now[3] + "_" + (Math.random() * 100) + ".JPG";
        File mkdir = new File("E:/GOA_TEMP/" + filePath);

        if (!mkdir.exists()) {
            mkdir.mkdirs();
        }
        ImageIO.write(outputImage, "jpg", new File("E:/GOA_TEMP/" + filePath + "/" + fileName));

        responseImage.setName(fileName);
        responseImage.setPath(filePath);
        responseImage.add(new Link(SERVER_NAME + "/api/images/paths/" + filePath.replaceAll("/", "-") + "/names/" + fileName).withRel("show_image"));
        responseImage.add(new Link(SERVER_NAME + "/api/products/test").withRel("make_product"));

        return responseImage;
    }
}
