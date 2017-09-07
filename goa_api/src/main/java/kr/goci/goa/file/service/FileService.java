package kr.goci.goa.file.service;

import kr.goci.goa.commons.Utils;
import kr.goci.goa.file.domain.ImageDto;
import kr.goci.goa.file.domain.ProductDto;
import kr.goci.goa.log.domain.Log;
import kr.goci.goa.log.repository.MakeLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Service
@Slf4j
public class FileService {
    private String SERVER_NAME = "http://localhost:8080";

    @Autowired
    private MakeLogRepository makeLogRepository;


    public byte[] displayImage(String path, String name) throws IOException {
        File image = new File("E:GOA_TEMP/" + path.replaceAll("-", "/") + "/" + name + ".JPG");
        byte[] result = Files.readAllBytes(image.toPath());
        log.info("path : {}, name : {}", path, name);

        return result;
    }

    public ImageDto.Response makeImage(ImageDto.Create image) throws IOException {
        ImageDto.Response responseImage = new ImageDto.Response();
        String[] dates = image.getDate().split("-");

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

        return responseImage;
    }

    public ProductDto.Response makeProduct(ProductDto.Create product) {
        String[] dates = product.getDate().split("-");
        StringBuilder dateParams = new StringBuilder();
        Arrays.stream(dates)
                .forEach(date -> dateParams.append(date).append(" "));

        String name = new SimpleDateFormat("yyMMddHHmmssSS").format(new Date());
        String params = dateParams + product.getType() + " " + name + " " + product.getStartX() + " " + product.getEndX() + " " + product.getStartY() + " " + product.getEndY();

        if (product.getOutputType().equals("he5")) {
            log.info("he5 convert! {} , param :  {}", product, params);
        } else {
            log.info("netCDF convert! {}, param : {}", product, params);
        }

        ProductDto.Response res = new ProductDto.Response("COMS_GOCI_L2A_" + product.getDate().replaceAll("-", "") + "." + product.getType() + "." + product.getOutputType());

        String hash = Utils.ShortId.generate();

        Log.Products saveLog = new Log.Products();
        saveLog.setDate(new Date());
        saveLog.setHashcode(hash);
        saveLog.setFilename(name);
        saveLog.setProductname("productName");
        saveLog.setOutputtype(product.getOutputType());
        saveLog.setType(product.getType());
        saveLog.setPath("path");
        makeLogRepository.save(saveLog);

        res.add(new Link(SERVER_NAME + "/api/products/hash/" + hash).withRel("down_product"));

        return res;
    }

    public Log.Products test(String hash) {
        Log.Products result = makeLogRepository.findByHashcode(hash);
        System.out.println(result);
        return result;
    }
}