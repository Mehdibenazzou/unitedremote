package com.unitedremoteback.Metier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unitedremoteback.entities.Shops;
import com.unitedremoteback.entities.ShopsRepository;

@Service
public class ShopMetierImpl implements ShopMetier {
	
	@Autowired
	private ShopsRepository repo;

	@Override
	public List<Shops> listShops() {
		return repo.findAll();
	}
	
}
