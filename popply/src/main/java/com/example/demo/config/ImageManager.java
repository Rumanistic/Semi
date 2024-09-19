package com.example.demo.config;

import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

public class ImageManager {
	private final String ROOTPATH = System.getProperty("user.dir") + "/src/main/popply/public/img/";
	
	public String createFolder(String company) throws Exception {
		String folderName = company.concat(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")).toString());
		
		Path dir = Paths.get(ROOTPATH, folderName);
		
		if (!Files.exists(dir)) {
            Files.createDirectory(dir);
        } else {
            System.out.println("Directory already exists: " + dir);
        }
		
		return dir.toString();
	}
	
	public HashMap<String, String> saveImage(String content, String company) throws Exception {
		String setTag = content;
		System.out.println(content + " | " + setTag);
		String imgSrc = "";
		int count = 1;
		String savedImgPath = createFolder(company);
		String base64 = "base64,";
		HashMap<String, String> resultSet = new HashMap<>();
		StringBuilder imgs = new StringBuilder();
		
		while(setTag.contains("<img")) {
			int imgStart = setTag.indexOf("<img");
			int baseStart = setTag.indexOf(base64, imgStart) + base64.length();
			int baseEnd = setTag.indexOf("\"", baseStart);
			
			if(baseStart != -1 && baseEnd != -1) {
				imgSrc = setTag.substring(baseStart, baseEnd);
				
				String fileExt = ".png";
				String fileName = new StringBuilder()
									.append(company)
									.append("_")
									.append(count)
									.append(fileExt)
									.toString();
				
				String fullPath = Paths.get(savedImgPath, fileName).toString();
				
				byte[] decodedBytes = Base64.getDecoder().decode(imgSrc);
				try (FileOutputStream fos = new FileOutputStream(fullPath)) {
					fos.write(decodedBytes);
				}
				
				if(imgs.length() > 0) {
					imgs.append(",");
				}
				
				imgs.append(company).append("_").append(count);
			}
			
			setTag = setTag.replaceFirst("<img[^>]*>", "image" + count++);
		}
		
		System.out.println(setTag);
		resultSet.put("content", setTag);
		resultSet.put("images", imgs.toString());
		
		return resultSet;
	}
}
