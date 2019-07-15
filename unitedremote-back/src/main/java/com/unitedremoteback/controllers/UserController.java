package com.unitedremoteback.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unitedremoteback.entities.DislikedShops;
import com.unitedremoteback.entities.DislikedShopsRepository;
import com.unitedremoteback.entities.Shops;
import com.unitedremoteback.entities.ShopsRepository;
import com.unitedremoteback.entities.User;
import com.unitedremoteback.entities.UserRepository;
import com.unitedremoteback.message.ResponseMessage;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ShopsRepository shopsRepository;
	
	@Autowired
	private DislikedShopsRepository dislikedShopsRepository;
	
    @GetMapping("/shops/{username}")
    public Optional<Set<Shops>> getShops(@PathVariable("username") String username){
        return this.userRepository.findByUsername(username).map((user) -> {
            return user.getlikedShops();
        });
    }
    
    @PostMapping("/{username}/{shopId}")
    public ResponseEntity<?> addShop(@PathVariable("username") String username, @PathVariable Long shopId){
        Optional<Shops> shopOp = this.shopsRepository.findById(shopId);
        Shops shop = shopOp.get();
        
        Optional<User> userOp = this.userRepository.findByUsername(username);
        User user = userOp.get();
        
        user.getlikedShops().add(shop);
        if(user.getlikedShops().contains(shop)) {
            userRepository.save(user);
            return new ResponseEntity<>(new ResponseMessage("It's done!\nThe shop is added to your favorites!"),
    				HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseMessage("Something went wrong :("),
    				HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    @PostMapping("/delete/{username}/{shopId}")
    public ResponseEntity<?> deleteShop(@PathVariable("username") String username, @PathVariable Long shopId){
        Optional<Shops> shopOp = this.shopsRepository.findById(shopId);
        Shops shop = shopOp.get();
        
        Optional<User> userOp = this.userRepository.findByUsername(username);
        User user = userOp.get();
        
        user.getlikedShops().remove(shop);
        if(user.getlikedShops().contains(shop)) {
            return new ResponseEntity<>(new ResponseMessage("Something went wrong :("),
    				HttpStatus.NOT_ACCEPTABLE);
        }
        else {
            userRepository.save(user);
            return new ResponseEntity<>(new ResponseMessage("It's done!\n The shop is deleted from your favorites!"),
    				HttpStatus.OK);
        }
    }
    
    @GetMapping("/dislikedshops/{username}")
    public Optional<Set<DislikedShops>> getDislikedShops(@PathVariable("username") String username) {
        return this.userRepository.findByUsername(username).map((user) -> {
            return user.getDislikedShops();
        });
    }
    
    @PostMapping("/dislikedshops/{username}")
    public ResponseEntity<?> addDislikedShop(@PathVariable("username") String username, @RequestBody DislikedShops shop){

        Optional<User> userOp = this.userRepository.findByUsername(username);
        User user = userOp.get();
        
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");  
	    Date date = new Date();
		DislikedShops ds = new DislikedShops(shop.getNom(), shop.getAddress(), shop.getDistance(), formatter.format(date));
        
        user.getDislikedShops().add(ds);
        if(user.getDislikedShops().contains(ds)) {
            userRepository.save(user);
            return new ResponseEntity<>(new ResponseMessage("It's done!\nThe shop is disliked!"),
    				HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new ResponseMessage("Something went wrong :("),
    				HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    @PostMapping("/dislikedshops/delete/{username}/{shopId}")
    public ResponseEntity<?> deleteDislikedShop(@PathVariable("username") String username, @PathVariable Long shopId){
        Optional<DislikedShops> shopOp = this.dislikedShopsRepository.findById(shopId);
        DislikedShops shop = shopOp.get();
        
        Optional<User> userOp = this.userRepository.findByUsername(username);
        User user = userOp.get();
        
        user.getDislikedShops().remove(shop);
        dislikedShopsRepository.delete(shop);
        
        if(user.getDislikedShops().contains(shop)) {
            return new ResponseEntity<>(new ResponseMessage("Something went wrong :("),
    				HttpStatus.NOT_ACCEPTABLE);
        }
        else {
            userRepository.save(user);
            return new ResponseEntity<>(new ResponseMessage("It's done!\n The shop is deleted from your dislikes!"),
    				HttpStatus.OK);
        }
    }
}
