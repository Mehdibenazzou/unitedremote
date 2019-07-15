package com.unitedremoteback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unitedremoteback.Metier.ShopMetier;
import com.unitedremoteback.entities.Shops;

@RestController
@RequestMapping("/shops")
@CrossOrigin(origins = "http://localhost:4200")
public class ShopsController {
	
	@Autowired
	private ShopMetier shopMetier;
	
	@GetMapping("/all")
	public List<Shops> listShops() {
		return shopMetier.listShops();
	}
}
