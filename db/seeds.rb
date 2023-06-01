# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require "open-uri"

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )

    # Create the base users for the application

    u2 = User.create!(
      name: 'Michael',
      username: 'aquaman',
      email: 'michael.phelps@gmail.com',
      password: 'password',
  )
  u2.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/michael'), filename: 'Profile-Pictures/michael')
  
  u3 = User.create!(
      name: 'Katie',
      username: 'katie-ledecky',
      email: 'katie.ledecky@gmail.com',
      password: 'password',
  )
  u3.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/katie'), filename: 'Profile-Pictures/katie')
  
  u4 = User.create!(
      name: 'Jason',
      username: 'aquaman2',
      email: 'jason.aquaman.momoa@gmail.com',
      password: 'password',
  )
  u4.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/jason'), filename: 'Profile-Pictures/jason')
  
  u5 = User.create!(
      name: 'Ariel',
      username: 'under-the-sea',
      email: 'ariel@gmail.com',
      password: 'password',
  )
  u5.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/ariel'), filename: 'Profile-Pictures/ariel')
  

    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 6),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  

    # Create some base listings for the application 

    puts "Creating listings..."
    l1 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: "263",
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael'
    )
    
    l1.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l2 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: "26",
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael'
    )
    
    l2.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l3 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: "2630",
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael'
    )
    
    l3.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l4 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: "150",
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael2'
    )
    
    l4.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])
    
    l5 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: "200",
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael3'
    )
    
    l5.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l6 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael6'
    )
    
    l6.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])
    
    l7 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael7'
    )
    
    l7.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l8 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael6'
    )
    
    l8.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])
    
    l9 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael7'
    )
    
    l9.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

    l10 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael6'
    )
    
    l10.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])
    
    l11 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      night_price: rand(100..300).to_s,
      country: 'United States',
      description: 'Lovely home a stones throw from Ocean Beach. Close to N Line making it easy to get anywhere in the city',
      unique_type: 'Ocean',
      bedrooms: 3,
      bathrooms: 2,
      max_guests: 5,
      rental_type: 'House',
      latitude: 37.76016,
      longitude: -122.50717,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'michael7'
    )
    
    l11.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])
    
    
    
    puts "Done!"
  end
