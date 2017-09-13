package kr.goci.goa.file.service;

import kr.goci.goa.commons.Exception.SQLNotExistException;
import kr.goci.goa.commons.Exception.OutOfRangeException;
import kr.goci.goa.commons.Utils;
import kr.goci.goa.file.domain.Image;
import kr.goci.goa.file.domain.ImageDto;
import kr.goci.goa.file.domain.ProductDto;
import kr.goci.goa.file.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Service
@Transactional
@Slf4j
public class FileService {
    private String SERVER_NAME = "http://localhost:8080";

    @Autowired
    private ImageRepository imageRepository;

    public byte[] displayImage(String hashcode) throws IOException {
        Image selectedImage = imageRepository.findByHashcode(hashcode);
        if (selectedImage == null) {
            throw new SQLNotExistException("display image");
        }

        File image = new File("E:GOA_TEMP/" + selectedImage.getPath() + "/" + selectedImage.getName() + ".JPG");
        byte[] result = Files.readAllBytes(image.toPath());
        log.info("path : {}, name : {}", selectedImage.getPath(), selectedImage.getName());

        return result;
    }

    public ImageDto.Response makeImage(ImageDto.Create image) throws IOException {
        ImageDto.Response responseImage = new ImageDto.Response();
        String[] dates = image.getDate().split("-");
        String hash = Utils.ShortId.generate() + Utils.ShortId.generate();

        if (image.getStartX() < 0 || image.getStartY() < 0 || image.getEndX() > 5000 || image.getEndY() > 5000) {
            throw new OutOfRangeException("범위를 벗어났습니다.");
        }

        BufferedImage originalImage = ImageIO.read(new File("E:\\GOA\\" + dates[0] + "\\" + dates[1] + "\\" + dates[2] + "\\" + dates[3] + "\\COMS_GOCI_L2A_GA_" + dates[0] + dates[1] + dates[2] + dates[3] + "." + image.getType() + ".BI.JPG"));
        BufferedImage outputImage = originalImage.getSubimage(image.getStartX() + 300, image.getStartY() + 300, image.getEndX() - image.getStartX(), image.getEndY() - image.getStartY());

        String[] now = new SimpleDateFormat("yyyy-MM-dd-ssSSS").format(new Date()).split("-");
        String filePath = now[0] + "/" + now[1] + "/" + now[2] + "/" + hash;
        String fileName = "GOCI_CROP_" + dates[0] + dates[1] + dates[2] + dates[3] + now[3] + "." + image.getType();
        File mkdir = new File("E:/GOA_TEMP/" + filePath);

        if (!mkdir.exists()) mkdir.mkdirs();

        ImageIO.write(outputImage, "jpg", new File("E:/GOA_TEMP/" + filePath + "/" + fileName + ".JPG"));

        responseImage.setHashcode(hash);
        responseImage.add(new Link(SERVER_NAME + "/api/images/hashes/" + hash).withRel("show_image"));

        imageRepository.save(new Image(filePath, fileName, image.getDate(), image.getStartX(), image.getStartY(), image.getEndX(), image.getEndY(), image.getType(), hash, new Date()));

        return responseImage;
    }

    public ProductDto.Response makeProduct(ProductDto.Create product) throws IOException, InterruptedException {
        Image productInfo = imageRepository.findByHashcode(product.getHashcode());
        if (productInfo == null) {
            throw new SQLNotExistException("make product");
        }

        String[] dates = productInfo.getFiledate().split("-");
        StringBuilder dateParams = new StringBuilder();
        Arrays.stream(dates)
                .forEach(date -> dateParams.append(date).append(" "));

        String params = dateParams + productInfo.getType() + " " + productInfo.getName() + " " + productInfo.getStartX() + " " + productInfo.getEndX() + " " + productInfo.getStartY() + " " + productInfo.getEndY() + " " + product.getOutputType() + " " + productInfo.getPath();

        Runtime.getRuntime().exec("C:\\GOA\\crop\\cropProducts.exe " + params).waitFor();

        ProductDto.Response res = new ProductDto.Response(productInfo.getName() + ".zip");

        res.add(new Link(SERVER_NAME + "/api/products/hashes/" + productInfo.getHashcode()).withRel("down_product"));

        return res;
    }

    public File downloadProduct(String hashcode) {
        Image productInfo = imageRepository.findByHashcode(hashcode);
        if (productInfo == null) {
            throw new SQLNotExistException("download product");
        }

        String filePath = "E:/GOA_TEMP/" + productInfo.getPath() + "/" + productInfo.getName() + ".zip";
        File downFile = new File(filePath);

        return downFile;
    }
}