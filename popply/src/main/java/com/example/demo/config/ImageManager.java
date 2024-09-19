package com.example.demo.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageManager {
	private final String ROOTPATH = System.getProperty("user.dir") + "/src/main/popply/public/img/";
	
	public void createFolder(String name) throws Exception {
		Path dir = Paths.get(ROOTPATH.concat(name));
		
		Files.createDirectory(dir);
	}
	
	public String saveImage(String tags) throws IOException {
		String setTag = tags;
		System.out.println(tags + " | " + setTag);
		String imgSrc = "";
		while(setTag.contains("<img")) {
			imgSrc = (setTag.substring(
							setTag.indexOf("<img"),
							setTag.indexOf("\" alt")
							).split(","))[1];
			setTag = setTag.replaceAll("<img[^>]*>", "image1");
		}
		
		System.out.println(setTag);
		return imgSrc;
	}
}
