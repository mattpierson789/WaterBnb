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
      first_name: 'Guest',
      last_name: 'User', 
      username: 'Demo-lition',
      email: 'demo@user.io', 
      password: 'password'
    )

    # Create the base users for the application

    u2 = User.create!(
      first_name: 'Michael',
      last_name: 'Phelps',
      username: 'Olympian',
      email: 'michael.phelps@gmail.com',  
      password: 'password',
    )
    u2.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/michael'), filename: 'Profile-Pictures/michael')
    
    u3 = User.create!(
      first_name: 'Katie',
      last_name: 'Ledecky',
      username: 'Freestyle',
      email: 'katie.ledecky@gmail.com',  
      password: 'password',
    )
    u3.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/katie'), filename: 'Profile-Pictures/katie')
    
    u4 = User.create!(
      first_name: 'Jason',
      last_name: 'Aquaman',
      username: 'Poseidon',
      email: 'jason.aquaman.momoa@gmail.com', 
      password: 'password',
    )
    u4.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/jason'), filename: 'Profile-Pictures/jason')
    
    u5 = User.create!(
      first_name: 'Ariel',
      last_name: 'Mermaid',
      username: 'LagoonBay',
      email: 'ariel@gmail.com',  
      password: 'password',
    )
    u5.photo.attach(io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Profile-Pictures/ariel'), filename: 'Profile-Pictures/ariel')

    def generate_unique_username
      username = Faker::Internet.unique.username
      while username.length < 7
        username = Faker::Internet.unique.username
      end
      username
    end
    
    20.times do 
      User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        username: generate_unique_username,
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
    

      

    # Create some base listings for the application 

    puts "Creating listings..."
    l1 = Listing.create!(
      lister_id: 2,
      city: 'San Francisco',
      title: 'Ocean Beach Surf getaway',
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
      rating: 4.50,
      wifi: true,
      kitchen: true,
      pets_allowed: false,
      parking: false,
      self_check_in: true,
      sleeps: 2,
      unique_activity: 'Surfing',
      lister_name: 'Michael'
    )
    
    l1.photos.attach([
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach1'), filename: 'OceanBeach1'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach2'), filename: 'OceanBeach2'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach3'), filename: 'OceanBeach3'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach4'), filename: 'OceanBeach4'},
      {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/OceanBeach5'), filename: 'OceanBeach5'}
    ])

      l2 = Listing.create!(
        lister_id: 1,
        city: 'Key West',
        title: 'Charming Ocean-front Bungalow',
        night_price: '185',
        country: 'United States',
        description: 'Delightful oceanfront bungalow with a quaint beach charm. Just steps away from the surf, sun, and sand.',
        unique_type: 'Ocean',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'House',
        latitude: 24.5513,
        longitude: -81.7526,
        wifi: true,
        rating: 4.6,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Katie'
      )

      l2.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Bungalow/Screen+Shot+2023-06-02+at+11.31.56+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Bungalow/Screen+Shot+2023-06-02+at+11.32.16+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Bungalow/Screen+Shot+2023-06-02+at+11.32.24+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Bungalow/Screen+Shot+2023-06-02+at+11.32.39+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Bungalow/Screen+Shot+2023-06-02+at+11.32.53+PM.png'), filename: '5'}
      ])
      
      l3 = Listing.create!(
        lister_id: 2,
        city: 'Lake Louise',
        title: 'Lakeside Alpine Cabin',
        night_price: '220',
        country: 'Canada',
        description: 'Cozy up in our beautiful alpine cabin, located nearby the stunning Lake Louise. Surrounded by towering peaks and sweeping vistas.',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 51.4254,
        longitude: -116.1773,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Hiking',
        lister_name: 'Michael'
      )

      l3.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lakeside+Alpine+Cabin/Screen+Shot+2023-09-20+at+6.40.25+PM.png'), filename: 'OceanBeach1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lakeside+Alpine+Cabin/Screen+Shot+2023-09-20+at+6.40.07+PM.png'), filename: 'OceanBeach2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lakeside+Alpine+Cabin/Screen+Shot+2023-09-20+at+6.39.52+PM.png'), filename: 'OceanBeach3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lakeside+Alpine+Cabin/Screen+Shot+2023-09-20+at+6.39.15+PM.png'), filename: 'OceanBeach4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lakeside+Alpine+Cabin/Screen+Shot+2023-09-20+at+6.39.01+PM.png'), filename: 'OceanBeach5'}
      ])
      
      l4 = Listing.create!(
        lister_id: 3,
        city: 'Amsterdam',
        title: 'Classic Canal House',
        night_price: '160',
        country: 'Netherlands',
        description: 'Stay in a classic, 17th-century Dutch house located right by the canals. Walking distance to the city center and major attractions.',
        unique_type: 'River',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'House',
        latitude: 52.3676,
        longitude: 4.9041,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: false,
        self_check_in: false,
        sleeps: 4,
        lister_name: 'Jason'
      )

      l4.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdan+Canal+House2/Screen+Shot+2023-06-02+at+11.22.51+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdan+Canal+House2/Screen+Shot+2023-06-02+at+11.23.00+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdan+Canal+House2/Screen+Shot+2023-06-02+at+11.23.27+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdan+Canal+House2/Screen+Shot+2023-06-02+at+11.23.40+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdan+Canal+House2/Screen+Shot+2023-06-02+at+11.23.50+PM.png'), filename: '5'}
      ])

      l5 = Listing.create!(
        lister_id: 4,
        city: 'Cape Town',
        title: 'Sea Point Luxury Apartment',
        night_price: '190',
        country: 'South Africa',
        description: 'Luxury meets comfort in our seaside apartment, with stunning views of the Atlantic. Located in the vibrant Sea Point neighborhood.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: -33.9258,
        longitude: 18.4232,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Ariel'
      )

      l5.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Luxury+Apt/Screen+Shot+2023-06-02+at+11.18.45+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Luxury+Apt/Screen+Shot+2023-06-02+at+11.18.54+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Luxury+Apt/Screen+Shot+2023-06-02+at+11.19.02+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Luxury+Apt/Screen+Shot+2023-06-02+at+11.19.12+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Luxury+Apt/Screen+Shot+2023-06-02+at+11.19.32+PM.png'), filename: '5'}
      ])


      
      l6 = Listing.create!(
        lister_id: 1,
        city: 'Fiji',
        title: 'Secluded Island Villa',
        night_price: '375',
        country: 'Fiji',
        description: 'Experience true island luxury in our private villa. Surrounded by lush tropical greenery and steps away from a pristine beach.',
        unique_type: 'Island',
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: -17.7134,
        longitude: 178.0650,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Swimming',
        lister_name: 'Katie'
      )

      l6.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Fiji+Secluded+Villa/Screen+Shot+2023-06-02+at+11.14.38+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Fiji+Secluded+Villa/Screen+Shot+2023-06-02+at+11.14.57+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Fiji+Secluded+Villa/Screen+Shot+2023-06-02+at+11.15.11+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Fiji+Secluded+Villa/Screen+Shot+2023-06-02+at+11.15.34+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Fiji+Secluded+Villa/Screen+Shot+2023-06-02+at+11.15.46+PM.png'), filename: '5'}
      ])
      
      l7 = Listing.create!(
        lister_id: 2,
        city: 'Geneva',
        title: 'Chic Lakeside Condo',
        night_price: '210',
        country: 'Switzerland',
        description: 'Stay in the heart of Geneva in our chic condo. Stunning lake views and walking distance to top attractions.',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 46.2044,
        longitude: 6.1432,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Michael'
      )

      l7.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Geneva+Lakeside+Condo/Screen+Shot+2023-06-02+at+11.09.42+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Geneva+Lakeside+Condo/Screen+Shot+2023-06-02+at+11.09.52+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Geneva+Lakeside+Condo/Screen+Shot+2023-06-02+at+11.10.11+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Geneva+Lakeside+Condo/Screen+Shot+2023-06-02+at+11.10.21+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Geneva+Lakeside+Condo/Screen+Shot+2023-06-02+at+11.10.31+PM.png'), filename: '5'}
      ])


      l8 = Listing.create!(
        lister_id: 3,
        city: 'Kauai',
        title: 'Rainforest River Retreat',
        night_price: '200',
        country: 'United States',
        description: 'Tucked away in the heart of Kauai rainforest, this retreat offers an enchanting experience with stunning views of the nearby bay + nearby to the Napali Coast Trail!.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 22.0964,
        longitude: -159.5261,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Hiking',
        lister_name: 'Jason'
      )

      l8.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Kaui+Rainforest+Retreat/Screen+Shot+2023-06-02+at+11.05.22+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Kaui+Rainforest+Retreat/Screen+Shot+2023-06-02+at+11.06.00+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Kaui+Rainforest+Retreat/Screen+Shot+2023-06-02+at+11.06.14+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Kaui+Rainforest+Retreat/Screen+Shot+2023-06-02+at+11.06.32+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Kaui+Rainforest+Retreat/Screen+Shot+2023-06-02+at+11.06.58+PM.png'), filename: '5'}
      ])
      
      l9 = Listing.create!(
        lister_id: 4,
        city: 'Iceland',
        title: 'Secluded Mountain Glass Cabin',
        night_price: '220',
        country: 'Iceland',
        description: 'Find peace in our secluded cabin nestled in the breathtaking Icelandic mountains. Ideal for nature lovers and Northern Lights chasers.',
        unique_type: 'Mountains',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 3,
        rental_type: 'Cabin',
        latitude: 64.9631,
        longitude: -19.0208,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'Hiking',
        lister_name: 'Ariel'
      )

      l9.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Iceland+Mountain+Cabin/Screen+Shot+2023-06-02+at+11.00.06+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Iceland+Mountain+Cabin/Screen+Shot+2023-06-02+at+11.00.29+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Iceland+Mountain+Cabin/Screen+Shot+2023-06-02+at+11.00.45+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Iceland+Mountain+Cabin/Screen+Shot+2023-06-02+at+11.01.04+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Iceland+Mountain+Cabin/Screen+Shot+2023-06-02+at+11.01.18+PM.png'), filename: '5'}
      ])
      
      l10 = Listing.create!(
        lister_id: 1,
        city: 'Maldives',
        title: 'Overwater Bungalow',
        night_price: '450',
        country: 'Maldives',
        description: 'Experience the luxury of an overwater bungalow in the beautiful Maldives. Crystal clear waters and abundant marine life await.',
        unique_type: 'Sea',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Villa',
        latitude: 3.2028,
        longitude: 73.2207,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 2,
        lister_name: 'Katie'
      )

      l10.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Maldives+Bungalow/Screen+Shot+2023-06-02+at+10.55.24+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Maldives+Bungalow/Screen+Shot+2023-06-02+at+10.55.38+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Maldives+Bungalow/Screen+Shot+2023-06-02+at+10.55.52+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Maldives+Bungalow/Screen+Shot+2023-06-02+at+10.56.01+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Maldives+Bungalow/Screen+Shot+2023-06-02+at+10.56.19+PM.png'), filename: '5'}
      ])

      l11 = Listing.create!(
        lister_id: 2,
        city: 'Venice',
        title: 'Venetian Canal Apartment',
        night_price: '180',
        country: 'Italy',
        description: 'Experience the charm of Venice from our cozy apartment located by the famous Venetian canals. Walking distance to major attractions.',
        unique_type: 'River',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Apartment',
        latitude: 45.4408,
        longitude: 12.3155,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 2,
        lister_name: 'Michael'
      )

      l11.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Canal+Apartment/Screen+Shot+2023-06-02+at+10.01.33+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Canal+Apartment/Screen+Shot+2023-06-02+at+10.01.43+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Canal+Apartment/Screen+Shot+2023-06-02+at+10.01.53+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Canal+Apartment/Screen+Shot+2023-06-02+at+10.02.03+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Canal+Apartment/Screen+Shot+2023-06-02+at+10.02.33+PM.png'), filename: '5'}
      ])
      
      l12 = Listing.create!(
        lister_id: 3,
        city: 'Santorini',
        title: 'Stunning Sea View Villa',
        night_price: '350',
        country: 'Greece',
        description: 'Immerse yourself in the beauty of Santorini from our stunning villa. Perfect for watching the world-renowned sunsets.',
        unique_type: 'Sea',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: 36.3932,
        longitude: 25.4615,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        lister_name: 'Jason'
      )

      l12.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa/Screen+Shot+2023-06-02+at+9.45.14+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa/Screen+Shot+2023-06-02+at+9.45.31+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa/Screen+Shot+2023-06-02+at+9.45.42+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa/Screen+Shot+2023-06-02+at+9.46.05+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa/Screen+Shot+2023-06-02+at+9.46.16+PM.png'), filename: '5'}
      ])
      
      l13 = Listing.create!(
        lister_id: 4,
        city: 'Tahiti',
        title: 'Tropical Island Yurt',
        night_price: '300',
        country: 'French Polynesia',
        description: 'Enjoy a unique stay in our tropical yurt, located on a secluded beach. Ideal for those seeking adventure and relaxation.',
        unique_type: 'Island',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Yurt',
        latitude: -17.6509,
        longitude: -149.4260,
        wifi: false,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'Swimming',
        lister_name: 'Ariel'
      )

      l13.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Tahiti+Island+Yurt/Screen+Shot+2023-06-02+at+10.47.12+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Tahiti+Island+Yurt/Screen+Shot+2023-06-02+at+10.47.23+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Tahiti+Island+Yurt/Screen+Shot+2023-06-02+at+10.47.34+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Tahiti+Island+Yurt/Screen+Shot+2023-06-02+at+10.47.44+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Tahiti+Island+Yurt/Screen+Shot+2023-06-02+at+10.48.04+PM.png'), filename: '5'}
      ])
      
      l14 = Listing.create!(
        lister_id: 1,
        city: 'Queenstown',
        title: 'Lake Wakatipu House',
        night_price: '275',
        country: 'New Zealand',
        description: 'Overlook the stunning Lake Wakatipu from our charming house. Minutes from town with activities for all adventure levels.',
        unique_type: 'Lake',
        bedrooms: 4,
        bathrooms: 2,
        max_guests: 8,
        rental_type: 'House',
        latitude: -45.0312,
        longitude: 168.6626,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 8,
        unique_activity: 'Hiking',
        lister_name: 'Katie'
      )

      l14.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Queenstown+House/Screen+Shot+2023-06-02+at+10.44.31+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Queenstown+House/Screen+Shot+2023-06-02+at+10.44.42+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Queenstown+House/Screen+Shot+2023-06-02+at+10.44.52+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Queenstown+House/Screen+Shot+2023-06-02+at+10.45.04+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Queenstown+House/Screen+Shot+2023-06-02+at+10.45.19+PM.png'), filename: '5'}
      ])
      
      l15 = Listing.create!(
        lister_id: 2,
        city: 'Bali',
        title: 'Seaside Bali Villa',
        night_price: '220',
        country: 'Indonesia',
        description: 'Relax in our tranquil seaside villa, featuring a private pool and garden. Close to the vibrant Seminyak area.',
        unique_type: 'Sea',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: -8.6913,
        longitude: 115.1677,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Surfing',
        lister_name: 'Michael'
      )

      l15.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Seaside+Bali+Villa/Screen+Shot+2023-06-02+at+10.42.17+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Seaside+Bali+Villa/Screen+Shot+2023-06-02+at+10.42.26+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Seaside+Bali+Villa/Screen+Shot+2023-06-02+at+10.42.35+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Seaside+Bali+Villa/Screen+Shot+2023-06-02+at+10.42.45+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Seaside+Bali+Villa/Screen+Shot+2023-06-02+at+10.43.14+PM.png'), filename: '5'}
      ])
      
      l16 = Listing.create!(
        lister_id: 3,
        city: 'Zermatt',
        title: 'Mountain Chalet with Matterhorn View',
        night_price: '400',
        country: 'Switzerland',
        description: 'Cozy chalet nestled in the Swiss Alps, with breathtaking views of the Matterhorn. Ski-in, ski-out access and close to the town center.',
        unique_type: 'Mountains',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Chalet',
        latitude: 46.0207,
        longitude: 7.7491,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: true,
        parking: false,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Skiing',
        lister_name: 'Jason'
      )

      l16.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Matterhorn+Chalet/Screen+Shot+2023-09-20+at+6.51.28+PM.png'), filename: 'OceanBeach1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Matterhorn+Chalet/Screen+Shot+2023-09-20+at+6.51.42+PM.png'), filename: 'OceanBeach2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Matterhorn+Chalet/Screen+Shot+2023-09-20+at+6.51.59+PM.png'), filename: 'OceanBeach3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Matterhorn+Chalet/Screen+Shot+2023-09-20+at+6.52.26+PM.png'), filename: 'OceanBeach4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Matterhorn+Chalet/Screen+Shot+2023-09-20+at+6.52.45+PM.png'), filename: 'OceanBeach5'}
      ])

      l17 = Listing.create!(
        lister_id: 4,
        city: 'Reykjavik',
        title: 'Geothermal Lagoon Cabin',
        night_price: '200',
        country: 'Iceland',
        description: 'Unique cabin located near one of Iceland\'s stunning geothermal lagoons. Experience the Northern Lights in comfort and style!',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 64.1265,
        longitude: -21.8174,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Swimming',
        lister_name: 'Ariel'
      )

      l17.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Reykjavik+Lagoon+Cabin/Screen+Shot+2023-06-02+at+10.19.48+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Reykjavik+Lagoon+Cabin/Screen+Shot+2023-06-02+at+10.20.01+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Reykjavik+Lagoon+Cabin/Screen+Shot+2023-06-02+at+10.20.11+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Reykjavik+Lagoon+Cabin/Screen+Shot+2023-06-02+at+10.20.23+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Reykjavik+Lagoon+Cabin/Screen+Shot+2023-06-02+at+10.20.35+PM.png'), filename: '5'}
      ])

      
      l18 = Listing.create!(
        lister_id: 1,
        city: 'Galapagos Islands',
        title: 'Island Life Villa',
        night_price: '350',
        country: 'Ecuador',
        description: 'Experience life on the Galapagos Islands in our ocean-front villa. Spot unique wildlife right from your doorstep!',
        unique_type: 'Island',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: -0.9537,
        longitude: -90.9656,
        wifi: false,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Surfing',
        lister_name: 'Katie'
      )

      l18.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa/Screen+Shot+2023-06-02+at+10.15.40+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa/Screen+Shot+2023-06-02+at+10.15.50+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa/Screen+Shot+2023-06-02+at+10.16.04+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa/Screen+Shot+2023-06-02+at+10.16.19+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa/Screen+Shot+2023-06-02+at+10.16.33+PM.png'), filename: '5'}
      ])

      
      l19 = Listing.create!(
        lister_id: 2,
        city: 'Amazon Rainforest',
        title: 'Rainforest Eco Yurt',
        night_price: '250',
        country: 'Brazil',
        description: 'Eco-friendly yurt in the heart of the Amazon Rainforest. Connect with nature and experience life in the jungle!',
        unique_type: 'River',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Yurt',
        latitude: -3.4653,
        longitude: -62.2159,
        wifi: false,
        rating: 4.5,
        kitchen: false,
        pets_allowed: true,
        parking: false,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'Hiking',
        lister_name: 'Michael'
      )
      
      l19.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amazon+Eco+Yurt/Screen+Shot+2023-06-02+at+10.12.31+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amazon+Eco+Yurt/Screen+Shot+2023-06-02+at+10.12.58+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amazon+Eco+Yurt/Screen+Shot+2023-06-02+at+10.13.08+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amazon+Eco+Yurt/Screen+Shot+2023-06-02+at+10.14.05+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amazon+Eco+Yurt/Screen+Shot+2023-06-02+at+10.14.19+PM.png'), filename: '5'}
      ])

      l20 = Listing.create!(
        lister_id: 3,
        city: 'Copenhagen',
        title: 'Canal Loft Apartment',
        night_price: '200',
        country: 'Denmark',
        description: 'Stay in our modern, airy loft overlooking the beautiful canals of Copenhagen. Close to Nyhavn and the city center.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: 55.6761,
        longitude: 12.5683,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Jason'
      )

      l20.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Copanhagen+Canal+Loft/Screen+Shot+2023-06-02+at+10.08.18+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Copanhagen+Canal+Loft/Screen+Shot+2023-06-02+at+10.08.37+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Copanhagen+Canal+Loft/Screen+Shot+2023-06-02+at+10.08.50+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Copanhagen+Canal+Loft/Screen+Shot+2023-06-02+at+10.09.03+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Copanhagen+Canal+Loft/Screen+Shot+2023-06-02+at+10.09.17+PM.png'), filename: '5'}
      ])

      
      l21 = Listing.create!(
        lister_id: 4,
        city: 'Isle of Skye',
        title: 'Clifftop Island Chalet',
        night_price: '220',
        country: 'United Kingdom',
        description: 'Unwind in our cozy chalet on the Isle of Skye. Panoramic views of the rugged coastline and close to local sightseeing spots.',
        unique_type: 'Island',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Chalet',
        latitude: 57.5359,
        longitude: -6.2263,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Hiking',
        lister_name: 'Ariel'
      )

      l21.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Clifftop+Island+Chalet/Screen+Shot+2023-06-02+at+10.04.30+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Clifftop+Island+Chalet/Screen+Shot+2023-06-02+at+10.05.03+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Clifftop+Island+Chalet/Screen+Shot+2023-06-02+at+10.05.19+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Clifftop+Island+Chalet/Screen+Shot+2023-06-02+at+10.06.02+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Clifftop+Island+Chalet/Screen+Shot+2023-06-02+at+10.06.15+PM.png'), filename: '5'}
      ])

      
      l22 = Listing.create!(
        lister_id: 1,
        city: 'Venice',
        title: 'Historic Waterfront Condo',
        night_price: '275',
        country: 'Italy',
        description: 'Experience the charm of Venice in our historic condo. Direct access to the canals and a short gondola ride to Piazza San Marco.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 45.4408,
        longitude: 12.3155,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Katie'
      )

      l22.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Waterfront+Condo/Screen+Shot+2023-06-02+at+10.50.00+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Waterfront+Condo/Screen+Shot+2023-06-02+at+10.50.10+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Waterfront+Condo/Screen+Shot+2023-06-02+at+10.50.18+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Waterfront+Condo/Screen+Shot+2023-06-02+at+10.50.29+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Venice+Waterfront+Condo/Screen+Shot+2023-06-02+at+10.50.42+PM.png'), filename: '5'}
      ])


      l23 = Listing.create!(
        lister_id: 2,
        city: 'Key West',
        title: 'Tropical Ocean Villa',
        night_price: '300',
        country: 'United States',
        description: 'Relax in our oceanfront villa with a private beach. Enjoy breathtaking sunsets and a short drive to Duval Street.',
        unique_type: 'Ocean',
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: 24.5557,
        longitude: -81.7826,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Swimming',
        lister_name: 'Michael'
      )

      l23.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Ocean+Villa/Screen+Shot+2023-06-02+at+9.58.39+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Ocean+Villa/Screen+Shot+2023-06-02+at+9.58.48+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Ocean+Villa/Screen+Shot+2023-06-02+at+9.58.57+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Ocean+Villa/Screen+Shot+2023-06-02+at+9.59.11+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Key+West+Ocean+Villa/Screen+Shot+2023-06-02+at+9.59.31+PM.png'), filename: '5'}
      ])
      
      l24 = Listing.create!(
        lister_id: 3,
        city: 'Lake Tahoe',
        title: 'Mountain Lake Cabin',
        night_price: '250',
        country: 'United States',
        description: 'Spend time in our cozy cabin on the shores of Lake Tahoe. Perfect for summer water activities and winter skiing.',
        unique_type: 'Lake',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Cabin',
        latitude: 39.0968,
        longitude: -120.0324,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Skiing',
        lister_name: 'Jason'
      )

      l24.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Tahoe+Mountain+Cabin/Screen+Shot+2023-06-02+at+9.52.53+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Tahoe+Mountain+Cabin/Screen+Shot+2023-06-02+at+9.53.03+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Tahoe+Mountain+Cabin/Screen+Shot+2023-06-02+at+9.53.15+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Tahoe+Mountain+Cabin/Screen+Shot+2023-06-02+at+9.53.33+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Tahoe+Mountain+Cabin/Screen+Shot+2023-06-02+at+9.53.48+PM.png'), filename: '5'}
      ])
      
      l25 = Listing.create!(
        lister_id: 4,
        city: 'Lake Bled',
        title: 'Picturesque Lake Bled House',
        night_price: '150',
        country: 'Slovenia',
        description: 'Stay in our charming house with stunning views of Lake Bled and the castle. Walk to the lake in just a few minutes.',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'House',
        latitude: 46.3636,
        longitude: 14.0938,
        wifi: true,
        rating: 4.6,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Hiking',
        lister_name: 'Ariel'
      )

      l25.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Bled+House/Screen+Shot+2023-06-02+at+9.50.19+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Bled+House/Screen+Shot+2023-06-02+at+9.50.49+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Bled+House/Screen+Shot+2023-06-02+at+9.50.59+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Bled+House/Screen+Shot+2023-06-02+at+9.51.15+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lake+Bled+House/Screen+Shot+2023-06-02+at+9.51.25+PM.png'), filename: '5'}
      ])

      l26 = Listing.create!(
        lister_id: 1,
        city: 'Santorini',
        title: 'Cliffside Sea Villa',
        night_price: '300',
        country: 'Greece',
        description: 'Experience stunning sea views from our cliffside villa in beautiful Santorini. Short walk to the beach and local tavernas.',
        unique_type: 'Sea',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: 36.3932,
        longitude: 25.4615,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Swimming',
        lister_name: 'Katie'
      )

      l26.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa+2/Screen+Shot+2023-06-02+at+9.47.35+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa+2/Screen+Shot+2023-06-02+at+9.47.44+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa+2/Screen+Shot+2023-06-02+at+9.48.06+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa+2/Screen+Shot+2023-06-02+at+9.48.22+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Santorini+Sea+Villa+2/Screen+Shot+2023-06-02+at+9.48.40+PM.png'), filename: '5'}
      ])
      
      l27 = Listing.create!(
        lister_id: 2,
        city: 'Banff',
        title: 'Mountain View Chalet',
        night_price: '275',
        country: 'Canada',
        description: 'Stay in our chalet with panoramic views of the Canadian Rockies. Steps away from hiking trails and Banff National Park.',
        unique_type: 'Mountains',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 5,
        rental_type: 'Chalet',
        latitude: 51.1784,
        longitude: -115.5708,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 5,
        unique_activity: 'Hiking',
        lister_name: 'Michael'
      )

      l27.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Banff/Screen+Shot+2023-09-22+at+6.27.04+PM.png'), filename: 'OceanBeach1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Banff/Screen+Shot+2023-09-22+at+6.27.57+PM.png'), filename: 'OceanBeach2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Banff/Screen+Shot+2023-09-22+at+6.27.39+PM.png'), filename: 'OceanBeach3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Banff/Screen+Shot+2023-09-22+at+6.27.22+PM.png'), filename: 'OceanBeach4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Banff/Screen+Shot+2023-09-22+at+6.27.04+PM.png'), filename: 'OceanBeach5'}
      ])
      
      l28 = Listing.create!(
        lister_id: 3,
        city: 'Galapagos Islands',
        title: 'Island Nature Villa',
        night_price: '350',
        country: 'Ecuador',
        description: 'Immerse yourself in nature in our villa on the Galapagos Islands. Ideal for wildlife lovers and adventurers.',
        unique_type: 'Island',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: -0.9537,
        longitude: -89.6176,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 6,
        lister_name: 'Jason'
      )
      
      l28.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa+2/Screen+Shot+2023-06-02+at+9.39.17+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa+2/Screen+Shot+2023-06-02+at+9.39.32+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa+2/Screen+Shot+2023-06-02+at+9.39.41+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa+2/Screen+Shot+2023-06-02+at+9.39.51+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Galapagos+Villa+2/Screen+Shot+2023-06-02+at+9.40.01+PM.png'), filename: '5'}
      ])
      

      l29 = Listing.create!(
        lister_id: 4,
        city: 'Sydney',
        title: 'Harbor View Apartment',
        night_price: '275',
        country: 'Australia',
        description: 'Enjoy panoramic views of Sydney Harbor from our stylish city apartment. Close to Opera House and iconic Bondi Beach.',
        unique_type: 'Ocean',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: -33.8679,
        longitude: 151.2093,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Surfing',
        lister_name: 'Ariel'
      )

      l29.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.02+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.13+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.25+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.39+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.55+PM.png'), filename: '5'}
      ])
      
      
      l30 = Listing.create!(
        lister_id: 1,
        city: 'Hong Kong',
        title: 'Luxurious Sea View Condo',
        night_price: '400',
        country: 'Hong Kong',
        description: 'Experience luxury in our high-rise condo overlooking Victoria Harbour. Steps away from shopping, dining and Star Ferry.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 22.3193,
        longitude: 114.1694,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Katie'
      )

      l30.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.53.46+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.24+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.35+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.48+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.55.05+PM.png'), filename: '5'}
      ])
      
      
      l31 = Listing.create!(
        lister_id: 2,
        city: 'Cape Town',
        title: 'Mountain & Sea View Villa',
        night_price: '350',
        country: 'South Africa',
        description: 'Breathtaking views of Table Mountain and the ocean from our spacious villa. Close to Camps Bay and the city centre.',
        unique_type: 'Ocean',
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: -33.9249,
        longitude: 18.4241,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Hiking',
        lister_name: 'Michael'
      )

      l31.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Mountain+Villa/Screen+Shot+2023-06-02+at+9.31.03+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Mountain+Villa/Screen+Shot+2023-06-02+at+9.31.18+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Mountain+Villa/Screen+Shot+2023-06-02+at+9.31.28+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Mountain+Villa/Screen+Shot+2023-06-02+at+9.31.38+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cape+Town+Mountain+Villa/Screen+Shot+2023-06-02+at+9.31.50+PM.png'), filename: '5'}
      ])

      l32 = Listing.create!(
        lister_id: 3,
        city: 'New York',
        title: 'Modern Riverside Condo',
        night_price: '400',
        country: 'United States',
        description: 'Experience the city that never sleeps from our modern condo with stunning views of the Hudson River. A short walk to Central Park and Times Square.',
        unique_type: 'River',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 40.7128,
        longitude: -74.0060,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Jason'
      )

      l32.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/New+York+Riverside+Condo/Screen+Shot+2023-06-02+at+9.28.44+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/New+York+Riverside+Condo/Screen+Shot+2023-06-02+at+9.28.57+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/New+York+Riverside+Condo/Screen+Shot+2023-06-02+at+9.29.07+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/New+York+Riverside+Condo/Screen+Shot+2023-06-02+at+9.29.18+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/New+York+Riverside+Condo/Screen+Shot+2023-06-02+at+9.29.28+PM.png'), filename: '5'}
      ])

      l33 = Listing.create!(
        lister_id: 4,
        city: 'Mumbai',
        title: 'Sea View Apartment in Bandra',
        night_price: '200',
        country: 'India',
        description: 'Feel the pulse of Mumbai from our sea view apartment in the trendy Bandra neighborhood. Close to shopping, dining, and the Bandstand Promenade.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: 19.0760,
        longitude: 72.8777,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Ariel'
      )

      l33.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Mumbai+Sea+View+Apt/Screen+Shot+2023-06-02+at+9.16.13+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Mumbai+Sea+View+Apt/Screen+Shot+2023-06-02+at+9.16.26+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Mumbai+Sea+View+Apt/Screen+Shot+2023-06-02+at+9.16.42+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Mumbai+Sea+View+Apt/Screen+Shot+2023-06-02+at+9.16.52+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Mumbai+Sea+View+Apt/Screen+Shot+2023-06-02+at+9.17.04+PM.png'), filename: '5'}
      ])
      
      l34 = Listing.create!(
        lister_id: 1,
        city: 'Dubai',
        title: 'Luxury Beachfront Villa',
        night_price: '500',
        country: 'United Arab Emirates',
        description: 'Experience ultimate luxury in our beachfront villa with a private pool. Close to the iconic Burj Al Arab and Mall of the Emirates.',
        unique_type: 'Sea',
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: 25.2048,
        longitude: 55.2708,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'Swimming',
        lister_name: 'Katie'
      )
      
      l34.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.15+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.26+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.36+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.46+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.11.10+PM.png'), filename: '5'}
      ])


      l35 = Listing.create!(
        lister_id: 2,
        city: 'Rio de Janeiro',
        title: 'Stylish Oceanfront Apartment',
        night_price: '250',
        country: 'Brazil',
        description: 'Feel the rhythm of Rio from our oceanfront apartment. Enjoy stunning views of Copacabana Beach and Sugarloaf Mountain.',
        unique_type: 'Ocean',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: -22.9068,
        longitude: -43.1729,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Swimming',
        lister_name: 'Michael'
      )
      
      l35.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Oceanfront+Apt/Screen+Shot+2023-06-02+at+9.08.02+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Oceanfront+Apt/Screen+Shot+2023-06-02+at+9.08.16+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Oceanfront+Apt/Screen+Shot+2023-06-02+at+9.08.27+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Oceanfront+Apt/Screen+Shot+2023-06-02+at+9.08.43+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Oceanfront+Apt/Screen+Shot+2023-06-02+at+9.08.57+PM.png'), filename: '5'}
      ])

      l36 = Listing.create!(
        lister_id: 3,
        city: 'Toronto',
        title: 'Lake View Condo in Downtown',
        night_price: '200',
        country: 'Canada',
        description: 'Enjoy the vibrant life of Toronto from our condo with a stunning view of Lake Ontario. Minutes away from CN Tower and the bustling city center.',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 43.6532,
        longitude: -79.3832,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Fishing',
        lister_name: 'Jason'
      )
      
      l36.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Toronto+Lakeview+Apt/Screen+Shot+2023-06-02+at+9.03.41+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Toronto+Lakeview+Apt/Screen+Shot+2023-06-02+at+9.03.55+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Toronto+Lakeview+Apt/Screen+Shot+2023-06-02+at+9.04.08+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Toronto+Lakeview+Apt/Screen+Shot+2023-06-02+at+9.04.18+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Toronto+Lakeview+Apt/Screen+Shot+2023-06-02+at+9.04.35+PM.png'), filename: '5'}
      ])

      l37 = Listing.create!(
        lister_id: 4,
        city: 'Amsterdam',
        title: 'Charming Canal House',
        night_price: '220',
        country: 'Netherlands',
        description: 'Experience Amsterdams historic charm from our traditional canal house. A short walk to the Anne Frank House and the bustling city center.',
        unique_type: 'River',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'House',
        latitude: 52.3676,
        longitude: 4.9041,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: false,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Ariel'
      )

      l37.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdam+Canal+House/Screen+Shot+2023-06-02+at+9.00.44+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdam+Canal+House/Screen+Shot+2023-06-02+at+9.00.58+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdam+Canal+House/Screen+Shot+2023-06-02+at+9.01.10+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdam+Canal+House/Screen+Shot+2023-06-02+at+9.01.24+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Amsterdam+Canal+House/Screen+Shot+2023-06-02+at+9.01.38+PM.png'), filename: '5'}
      ])

      l38 = Listing.create!(
        lister_id: 1,
        city: 'Sydney',
        title: 'Harbourside Luxury Apartment',
        night_price: '300',
        country: 'Australia',
        description: 'Enjoy the best of Sydney from our luxury apartment overlooking the iconic Harbour. Close to the Opera House and Royal Botanic Gardens.',
        unique_type: 'Sea',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 5,
        rental_type: 'Apartment',
        latitude: -33.8688,
        longitude: 151.2093,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 5,
        unique_activity: 'Surfing',
        lister_name: 'Katie'
      )

      l38.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.02+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.13+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.25+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.39+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Sydney+Harbour+Apt/Screen+Shot+2023-06-02+at+8.57.55+PM.png'), filename: '5'}
      ])

      l39 = Listing.create!(
        lister_id: 2,
        city: 'Hong Kong',
        title: 'Seaview Condo in Vibrant City',
        night_price: '350',
        country: 'Hong Kong',
        description: 'Experience the hustle and bustle of Hong Kong from our seaview condo. Perfectly located in the heart of the city, a stone\'s throw away from Victoria Harbour.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 22.3193,
        longitude: 114.1694,
        wifi: true,
        rating: 4.7,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Fishing',
        lister_name: 'Michael'
      )

      l39.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.53.46+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.24+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.35+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.54.48+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Hong+Kong+Sea+View+Condo/Screen+Shot+2023-06-02+at+8.55.05+PM.png'), filename: '5'}
      ])

      l40 = Listing.create!(
        lister_id: 3,
        city: 'Istanbul',
        title: 'Riverside Villa with Bosphorus View',
        night_price: '250',
        country: 'Turkey',
        description: 'Discover the unique blend of East and West in Istanbul from our riverside villa. Spectacular view of the Bosphorus, close to the Dolmabahçe Palace.',
        unique_type: 'River',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Villa',
        latitude: 41.0082,
        longitude: 28.9784,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        lister_name: 'Jason'
      )

      l40.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Istanbul+Villa/Screen+Shot+2023-06-02+at+8.49.22+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Istanbul+Villa/Screen+Shot+2023-06-02+at+8.49.52+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Istanbul+Villa/Screen+Shot+2023-06-02+at+8.50.05+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Istanbul+Villa/Screen+Shot+2023-06-02+at+8.50.20+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Istanbul+Villa/Screen+Shot+2023-06-02+at+8.50.58+PM.png'), filename: '5'}
      ])

      l41 = Listing.create!(
        lister_id: 4,
        city: 'Barcelona',
        title: 'Sunny Beachfront Condo',
        night_price: '200',
        country: 'Spain',
        description: 'Soak up the sun from our beachfront condo in the heart of Barcelona. Walking distance to vibrant Las Ramblas and stunning architecture.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 41.3851,
        longitude: 2.1734,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Swimming',
        lister_name: 'Ariel'
      )

      l41.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Barcelona+Condo/Screen+Shot+2023-06-02+at+8.45.38+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Barcelona+Condo/Screen+Shot+2023-06-02+at+8.46.06+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Barcelona+Condo/Screen+Shot+2023-06-02+at+8.46.16+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Barcelona+Condo/Screen+Shot+2023-06-02+at+8.46.27+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Barcelona+Condo/Screen+Shot+2023-06-02+at+8.46.36+PM.png'), filename: '5'}
      ])

      l42 = Listing.create!(
        lister_id: 1,
        city: 'Dubai',
        title: 'Luxurious Ocean View Apartment',
        night_price: '450',
        country: 'United Arab Emirates',
        description: 'Experience the luxury of Dubai from our ocean view apartment in the Marina. Close to shopping, dining, and the world\'s tallest skyscraper.',
        unique_type: 'Ocean',
        bedrooms: 3,
        bathrooms: 3,
        max_guests: 6,
        rental_type: 'Apartment',
        latitude: 25.2048,
        longitude: 55.2708,
        wifi: true,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        lister_name: 'Katie'
      )

      l42.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.15+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.26+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.36+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.10.46+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Dubai+Villa/Screen+Shot+2023-06-02+at+9.11.10+PM.png'), filename: '5'}
      ])

      l43 = Listing.create!(
        lister_id: 2,
        city: 'Singapore',
        title: 'Modern Marina Bay Condo',
        night_price: '300',
        country: 'Singapore',
        description: 'Take in the breathtaking skyline of Singapore from our condo in Marina Bay. Minutes from Gardens by the Bay and world-class dining.',
        unique_type: 'Sea',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Condo',
        latitude: 1.3521,
        longitude: 103.8198,
        wifi: true,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        lister_name: 'Michael'
      )
      
      l43.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Songapre+Condo/Screen+Shot+2023-06-02+at+8.36.17+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Songapre+Condo/Screen+Shot+2023-06-02+at+8.36.45+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Songapre+Condo/Screen+Shot+2023-06-02+at+8.37.02+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Songapre+Condo/Screen+Shot+2023-06-02+at+8.38.12+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Songapre+Condo/Screen+Shot+2023-06-02+at+8.38.34+PM.png'), filename: '5'}
      ])


      l44 = Listing.create!(
        lister_id: 3,
        city: 'Rio de Janeiro',
        title: 'Copacabana Beachfront Apartment',
        night_price: '220',
        country: 'Brazil',
        description: 'Breathtaking ocean view from our apartment right on Copacabana Beach. Walk to bars, restaurants, and experience the vibrant Rio nightlife.',
        unique_type: 'Ocean',
        bedrooms: 2,
        bathrooms: 2,
        max_guests: 4,
        rental_type: 'Apartment',
        latitude: -22.9068,
        longitude: -43.1729,
        wifi: true,
        rating: 4.6,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'Swimming',
        lister_name: 'Jason'
      )

      l44.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Cabana/Screen+Shot+2023-06-02+at+8.32.49+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Cabana/Screen+Shot+2023-06-02+at+8.33.16+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Cabana/Screen+Shot+2023-06-02+at+8.33.28+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Cabana/Screen+Shot+2023-06-02+at+8.33.42+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rio+Cabana/Screen+Shot+2023-06-02+at+8.33.54+PM.png'), filename: '5'}
      ])

      l45 = Listing.create!(
        lister_id: 1,
        city: 'Moab',
        title: 'Riverside Cabin near Arches National Park',
        night_price: '150',
        country: 'United States',
        description: 'Escape to a cozy riverside cabin near Arches National Park. Enjoy stunning views of the surrounding desert and relax by the river. This off-grid retreat offers hiking trails and the opportunity to explore the natural beauty of the park.',
        unique_type: 'River',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Cabin',
        latitude: 38.5733,
        longitude: -109.5498,
        wifi: false,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'National Park',
        lister_name: 'Katie'
      )

      l45.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Moab+Cabin/Screen+Shot+2023-06-02+at+8.29.05+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Moab+Cabin/Screen+Shot+2023-06-02+at+8.29.18+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Moab+Cabin/Screen+Shot+2023-06-02+at+8.29.36+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Moab+Cabin/Screen+Shot+2023-06-02+at+8.29.52+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Moab+Cabin/Screen+Shot+2023-06-02+at+8.30.17+PM.png'), filename: '5'}
      ])

      l46 = Listing.create!(
        lister_id: 2,
        city: 'Gatlinburg',
        title: 'Lakefront Chalet near Great Smoky Mountains National Park',
        night_price: '250',
        country: 'United States',
        description: 'Experience the beauty of the Great Smoky Mountains National Park from a lakefront chalet in Gatlinburg. This off-grid retreat provides direct access to the lake, where you can swim, fish, and enjoy water activities. Explore the nearby trails and immerse yourself in nature.',
        unique_type: 'Lake',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Chalet',
        latitude: 35.7126,
        longitude: -83.5161,
        wifi: false,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'National Park',
        lister_name: 'Michael'
      )

      l46.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Smoky+National+Park+Chalet/Screen+Shot+2023-06-02+at+8.25.47+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Smoky+National+Park+Chalet/Screen+Shot+2023-06-02+at+8.26.05+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Smoky+National+Park+Chalet/Screen+Shot+2023-06-02+at+8.26.16+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Smoky+National+Park+Chalet/Screen+Shot+2023-06-02+at+8.26.28+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Smoky+National+Park+Chalet/Screen+Shot+2023-06-02+at+8.26.53+PM.png'), filename: '5'}
      ])

      l47 = Listing.create!(
        lister_id: 3,
        city: 'Estes Park',
        title: 'Lakefront Retreat near Rocky Mountain National Park',
        night_price: '300',
        country: 'United States',
        description: 'Enjoy a serene lakefront retreat near Rocky Mountain National Park in Estes Park. This off-grid cabin offers stunning lake views and access to water activities such as swimming and fishing. Discover the nearby trails and immerse yourself in the beauty of the national park.',
        unique_type: 'Lake',
        bedrooms: 4,
        bathrooms: 3,
        max_guests: 8,
        rental_type: 'Cabin',
        latitude: 40.3428,
        longitude: -105.6836,
        wifi: false,
        rating: 4.9,
        kitchen: true,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 8,
        unique_activity: 'National Park',
        lister_name: 'Ariel'
      )

      l47.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rockies+Chalet/Screen+Shot+2023-09-20+at+7.10.22+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rockies+Chalet/Screen+Shot+2023-09-20+at+7.09.50+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rockies+Chalet/Screen+Shot+2023-09-20+at+7.09.35+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rockies+Chalet/Screen+Shot+2023-09-20+at+7.09.12+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Rockies+Chalet/Screen+Shot+2023-09-20+at+7.08.53+PM.png'), filename: '5'}
      ])

      l48 = Listing.create!(
        lister_id: 4,
        city: 'Denali',
        title: 'Lake View Cabin near Denali National Park',
        night_price: '200',
        country: 'United States',
        description: 'Experience the beauty of Denali National Park from a charming lake view cabin. This off-grid retreat offers stunning views of the surrounding mountains and direct access to the lake. Explore the parks trails, spot wildlife, and enjoy a peaceful getaway in nature.',
        unique_type: 'Lake',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 63.1148,
        longitude: -151.1926,
        wifi: false,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'National Park',
        lister_name: 'Jason'
      )


      l48.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cabin+at+Denai/Screen+Shot+2023-06-02+at+8.19.35+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cabin+at+Denai/Screen+Shot+2023-06-02+at+8.19.15+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cabin+at+Denai/Screen+Shot+2023-06-02+at+8.18.57+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cabin+at+Denai/Screen+Shot+2023-06-02+at+8.18.45+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Cabin+at+Denai/Screen+Shot+2023-06-02+at+8.18.32+PM.png'), filename: '5'}
      ])

      l49 = Listing.create!(
        lister_id: 1,
        city: 'Everglades',
        title: 'Riverside Glamping near Everglades National Park',
        night_price: '180',
        country: 'United States',
        description: 'Immerse yourself in the unique ecosystem of the Everglades National Park from a riverside glamping site. Stay in a comfortable tent surrounded by nature and enjoy direct access to the river. Explore the parks wetlands, spot wildlife, and experience the tranquility of the Everglades.',
        unique_type: 'River',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Yurt',
        latitude: 25.7459,
        longitude: -80.5545,
        wifi: false,
        rating: 4.7,
        kitchen: false,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'National Park',
        lister_name: 'Katie'
      )

      l49.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Everglades+Yurt/Screen+Shot+2023-06-02+at+8.15.26+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Everglades+Yurt/Screen+Shot+2023-06-02+at+8.15.36+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Everglades+Yurt/Screen+Shot+2023-06-02+at+8.15.46+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Everglades+Yurt/Screen+Shot+2023-06-02+at+8.16.11+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Everglades+Yurt/Screen+Shot+2023-06-02+at+8.16.31+PM.png'), filename: '5'}
      ])

      l50 = Listing.create!(
        lister_id: 2,
        city: 'Acadia',
        title: 'Oceanfront Cabin near Acadia National Park',
        night_price: '250',
        country: 'United States',
        description: 'Enjoy an oceanfront retreat near Acadia National Park in a charming cabin. Wake up to stunning views of the ocean, stroll along the beach, and explore the parks trails and coastal landscapes. Experience the beauty of Acadia and relax in a peaceful coastal setting.',
        unique_type: 'Ocean',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 44.3386,
        longitude: -68.2733,
        wifi: false,
        rating: 4.9,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'National Park',
        lister_name: 'Michael'
      )

      l50.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Acadia+Oceanfront+Cabin/Screen+Shot+2023-06-02+at+8.11.59+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Acadia+Oceanfront+Cabin/Screen+Shot+2023-06-02+at+8.12.12+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Acadia+Oceanfront+Cabin/Screen+Shot+2023-06-02+at+8.12.24+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Acadia+Oceanfront+Cabin/Screen+Shot+2023-06-02+at+8.12.38+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Acadia+Oceanfront+Cabin/Screen+Shot+2023-06-02+at+8.13.15+PM.png'), filename: '5'}
      ])

      l51 = Listing.create!(
        lister_id: 4,
        city: 'Olympic',
        title: 'Beachfront Cabin near Olympic National Park',
        night_price: '220',
        country: 'United States',
        description: 'Escape to a cozy beachfront cabin near Olympic National Park. Enjoy direct access to the beach, where you can relax, explore tide pools, and witness stunning sunsets. Immerse yourself in the natural wonders of the park, hike through ancient forests, and discover the diverse ecosystems of Olympic.',
        unique_type: 'Ocean',
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        rental_type: 'Cabin',
        latitude: 47.8021,
        longitude: -124.6288,
        wifi: false,
        rating: 4.8,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 4,
        unique_activity: 'National Park',
        lister_name: 'Jason'
      )

      l51.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Olympic+Cabin/Screen+Shot+2023-06-02+at+8.06.33+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Olympic+Cabin/Screen+Shot+2023-06-02+at+8.06.46+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Olympic+Cabin/Screen+Shot+2023-06-02+at+8.06.57+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Olympic+Cabin/Screen+Shot+2023-06-02+at+8.07.10+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Olympic+Cabin/Screen+Shot+2023-06-02+at+8.07.28+PM.png'), filename: '5'}
      ])

      l52 = Listing.create!(
        lister_id: 1,
        city: 'Yellowstone',
        title: 'Lake View Lodge near Yellowstone National Park',
        night_price: '280',
        country: 'United States',
        description: 'Experience the beauty of Yellowstone National Park from a cozy lake view lodge. Wake up to breathtaking views, go fishing in the lake, and hike through the parks stunning landscapes. Immerse yourself in the geothermal wonders, spot wildlife, and enjoy a memorable stay near Yellowstone.',
        unique_type: 'Lake',
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        rental_type: 'Cabin',
        latitude: 44.4279,
        longitude: -110.5885,
        wifi: false,
        rating: 4.7,
        kitchen: true,
        pets_allowed: true,
        parking: true,
        self_check_in: true,
        sleeps: 6,
        unique_activity: 'National Park',
        lister_name: 'Katie'
      )

      l52.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lodge+at+Yellowstone/Screen+Shot+2023-06-02+at+8.04.24+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lodge+at+Yellowstone/Screen+Shot+2023-06-02+at+8.04.40+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lodge+at+Yellowstone/Screen+Shot+2023-06-02+at+8.04.53+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lodge+at+Yellowstone/Screen+Shot+2023-06-02+at+8.05.10+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Lodge+at+Yellowstone/Screen+Shot+2023-06-02+at+8.05.27+PM.png'), filename: '5'}
      ])

      l53 = Listing.create!(
        lister_id: 2,
        city: 'Zion',
        title: 'Riverside Glamping near Zion National Park',
        night_price: '190',
        country: 'United States',
        description: 'Experience the natural beauty of Zion National Park from a riverside glamping site. Stay in a comfortable tent by the river, listen to the soothing sounds of nature, and explore the parks stunning canyons and hiking trails. Unwind and reconnect with nature in this off-grid glamping retreat.',
        unique_type: 'River',
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        rental_type: 'Yurt',
        latitude: 37.2982,
        longitude: -113.0263,
        wifi: false,
        rating: 4.9,
        kitchen: false,
        pets_allowed: false,
        parking: true,
        self_check_in: true,
        sleeps: 2,
        unique_activity: 'National Park',
        lister_name: 'Michael'
      )



      l53.photos.attach([
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Zion+Yurt/Screen+Shot+2023-06-02+at+8.01.14+PM.png'), filename: '1'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Zion+Yurt/Screen+Shot+2023-06-02+at+8.01.35+PM.png'), filename: '2'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Zion+Yurt/Screen+Shot+2023-06-02+at+8.01.47+PM.png'), filename: '3'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Zion+Yurt/Screen+Shot+2023-06-02+at+8.02.06+PM.png'), filename: '4'},
        {io: URI.open('https://mp-waterbnb-seeds.s3.amazonaws.com/Listings/Zion+Yurt/Screen+Shot+2023-06-02+at+8.02.21+PM.png'), filename: '5'}
      ])
    
    
    puts "Done!"
  end

  puts "Creating reservations..."


# Assuming you have already defined listings and users
listings = Listing.all.to_a
users = User.all.to_a

num_listings = 53
reservation_range = (1..10)
max_reservation_duration = 7
years_to_go_back = 7
today = Date.today

# Users reserved for current reservations
reserved_users = users.sample(users.length / 2)  # Reserve half of the users for current reservations
general_users = users - reserved_users  # Remaining users for random reservations

listing_range = (1..num_listings)
listing_range.each do |listing_num|
  listing = listings[listing_num - 1]
  reserved_user = reserved_users.pop  # Pop a user from reserved_users array for current reservation
  
  reservation_range.each do |res_num|
    guest = res_num == 1 ? reserved_user : (general_users + reserved_users).sample  # Ensure the first reservation for each listing is a current one
    
    # If guest is nil, skip to the next iteration
    next unless guest

    # For the first reservation of each listing, make it a current reservation
    if res_num == 1
      start_date = today
      end_date = today + rand(1..max_reservation_duration).days  # Randomly choose the end date for current reservation
    else
      # For the other reservations, use the previous logic
      max_start_date = today - years_to_go_back.years
      start_date = Faker::Date.between(from: max_start_date, to: today)
      end_date = start_date + rand(1..max_reservation_duration).days
    end
    
    # Check and create reservation as in your previous logic
    if start_date < end_date
      conflicts = listing.reservations.where(
        '(start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?)',
        start_date, start_date, end_date, end_date
      )
      
      if conflicts.empty?
        reservation = Reservation.create!(
          listing_id: listing.id,
          reserver_id: guest.id,
          num_guests: rand(1..25),
          start_date: start_date,
          end_date: end_date
        )
        
        puts "Created reservation #{res_num} for Listing #{listing_num}"
      else
        puts "Conflict found for reservation #{res_num} in Listing #{listing_num}, skipping..."
      end
    else
      puts "Invalid date range for reservation #{res_num} in Listing #{listing_num}, skipping..."
    end
  end
end
puts 'Done'

  







  puts "Creating reviews..."

  users = User.all.to_a
  listings = Listing.all.to_a
  reservations = Reservation.all.to_a

  def generate_reviews(reservations)
    reviews = []

    review_texts = [
      "Our stay at this place was absolutely fantastic! The host was extremely accommodating, and the check-in process was a breeze. The cleanliness and accuracy of the listing were outstanding.",
      "We couldn't have asked for a better stay. The value for the price was exceptional, and the host's communication was top-notch. The location was perfect for our needs.",
      "This place exceeded our expectations in every way. The host was friendly and responsive, and the check-in was seamless. We highly recommend this listing to others.",
      "Our experience here was superb. The cleanliness of the place was impeccable, and the host provided all the necessary information for a great stay. The value for the price was excellent.",
      "We had a wonderful time staying here. The accuracy of the listing was spot on, and the communication with the host was outstanding. The location couldn't have been better.",
      "From start to finish, our stay was exceptional. The host's attention to detail was evident, and the check-in process was hassle-free. We would definitely return in the future.",
      "Our stay was a delight from beginning to end. The host was accommodating and helpful, and the cleanliness and comfort of the place were top-notch. We couldn't have asked for more.",
      "We had an amazing experience at this property. The host was welcoming, and the check-in process was smooth. The value for the price was unbeatable, and the location was convenient.",
      "Our time at this place was simply wonderful. The accuracy of the listing was perfect, and the communication with the host was outstanding. We left with great memories.",
      "This accommodation was a hidden gem. The cleanliness and amenities provided were exceptional, and the host's recommendations for local attractions were spot on.",
      "We thoroughly enjoyed our stay here. The host's hospitality was exceptional, and the check-in was a breeze. The overall value for the price was outstanding.",
      "Our stay was nothing short of amazing. The host's communication was prompt and helpful, and the cleanliness of the place exceeded our expectations. We would return in a heartbeat.",
      "This property provided us with a fantastic experience. The host went above and beyond to ensure our comfort, and the location was peaceful and relaxing. Highly recommended!",
      "Our stay at this place was a true pleasure. The host's warmth and attentiveness made all the difference, and the accuracy of the listing was on point.",
      "We had an excellent time staying here. The host was incredibly helpful and responsive, and the cleanliness and comfort of the place were outstanding. We can't wait to come back!",
      "This accommodation made our trip unforgettable. The host's hospitality was exceptional, and the check-in process was seamless. The amenities provided were top-notch.",
      "Our experience at this property was wonderful. The host was attentive, and the cleanliness and accuracy of the listing were exceptional. We would highly recommend this place.",
      "We had a fantastic stay at this property. The location was convenient, and the host's communication was excellent. The cleanliness and amenities provided were top-notch.",
      "Our stay here was an absolute joy. The host's attention to detail and warm welcome made our trip special. We couldn't have asked for a better experience.",
      "Staying here was a highlight of our trip. The host's recommendations for local attractions were on point, and the amenities provided added to our enjoyment.",
      "Our time at this place was simply amazing. The host's attention to detail and the convenience of the location made our trip unforgettable.",
      "This accommodation exceeded our expectations. The host's responsiveness and the overall value for the price were outstanding. We can't wait to return for another stay.",
      "Our stay here was absolutely perfect. The host's communication and the cleanliness of the place were exceptional. We left with nothing but positive memories.",
      "We had a fantastic experience staying at this property. The host's hospitality and the amenities provided made our trip special. Highly recommended!",
      "Staying at this place was a true pleasure. The host's responsiveness and the accuracy of the listing exceeded our expectations. We will be back for sure.",
      "Our stay here was simply fantastic. The host's attention to detail and the overall experience were top-notch. We left with great memories and a desire to return.",
      "This accommodation is a hidden gem. The host's warm welcome and the convenience of the location made our stay enjoyable. We will definitely be back.",
      "Our time at this property was unforgettable. The host's hospitality and the cleanliness of the place exceeded our expectations. We can't wait to return.",
      "Our stay here was a dream come true. The host's communication and the value for the price were exceptional. We left with smiles on our faces and a desire to return.",
      "We had a wonderful time at this property. The host's warmth and attentiveness made our stay special, and the amenities provided added to our enjoyment.",
      "Staying here was a highlight of our trip. The host's recommendations for local attractions were spot on, and the overall value for the price was outstanding.",
      "Our time at this place was simply amazing. The host's attention to detail and the convenience of the location made our trip unforgettable.",
      "This accommodation exceeded our expectations. The host's responsiveness and the overall value for the price were outstanding. We can't wait to return for another stay.",
      "Our stay here was absolutely perfect. The host's communication and the cleanliness of the place were exceptional. We left with nothing but positive memories.",
      "We had a fantastic experience staying at this property. The host's hospitality and the amenities provided made our trip special. Highly recommended!",
      "Staying at this place was a true pleasure. The host's responsiveness and the accuracy of the listing exceeded our expectations. We will be back for sure.",
      "Our stay here was simply fantastic. The host's attention to detail and the overall experience were top-notch. We left with great memories and a desire to return.",
      "This accommodation is a hidden gem. The host's warm welcome and the convenience of the location made our stay enjoyable. We will definitely be back.",
      "Our time at this property was unforgettable. The host's hospitality and the cleanliness of the place exceeded our expectations. We can't wait to return.",
      "Our stay here was a dream come true. The host's communication and the value for the price were exceptional. We left with smiles on our faces and a desire to return.",
      "The moment we arrived at this place, we were blown away by its beauty! The host's warm welcome and attention to detail made our stay exceptional.",
      "Our stay here was like a dream come true. The view from the property was breathtaking, and the host's recommendations for local restaurants were spot on.",
      "This accommodation provided the perfect getaway. The tranquility of the location and the comfortable amenities ensured a relaxing stay.",
      "We couldn't have asked for a better vacation. The host's hospitality was second to none, and the cleanliness of the place was remarkable.",
      "From the moment we stepped in, we felt at home. The cozy atmosphere and thoughtful touches by the host made our stay memorable.",
      "Our experience at this property was truly extraordinary. The unique design of the place and the host's graciousness left a lasting impression.",
      "Staying here was a highlight of our trip. The host's knowledge of the local area and the incredible sunsets made our evenings unforgettable.",
      "Our stay at this place was simply magical. The host's kindness and the abundance of wildlife in the area made our stay one-of-a-kind.",
      "This hidden gem exceeded our wildest expectations. The host's attention to detail and the serenity of the surroundings made for a perfect retreat.",
      "Our time at this property was a treasure. The host's thoughtfulness and the convenience of nearby hiking trails added to our enjoyment.",
      "We had a fantastic experience staying at this unique property. The host's commitment to sustainability and the starry nights were highlights of our trip.",
      "Staying at this place was a true escape. The host's homemade breakfasts and the peaceful mornings on the porch made our stay exceptional.",
      "Our stay here was absolutely perfect. The host's local insights and the impeccably maintained garden were a delight.",
      "We had an unforgettable experience at this property. The host's warmth and the picturesque surroundings created cherished memories.",
      "This accommodation was a true paradise. The host's commitment to preserving nature and the abundance of birdwatching opportunities were incredible.",
      "Our experience at this property was a masterpiece. The host's passion for art and the stunning sculptures on the grounds made our stay unique.",
      "We had a fantastic time staying at this charming property. The host's homemade jams and the serene lake views made mornings special.",
      "Our stay here was like a fairytale. The host's attention to detail and the enchanting forest nearby made our stay magical.",
      "This hidden treasure was a dream come true. The host's dedication to sustainability and the starry nights were highlights of our trip.",
      "Our time at this property was a journey into tranquility. The host's thoughtful touches and the serene lake views made our stay unforgettable.",
      "Our stay at this place was an absolute joy. The host's friendly demeanor and the picturesque countryside made for a delightful getaway.",
      "We couldn't have asked for a better retreat. The host's knowledge of the local history and the cozy fireplace created warm memories.",
      "This accommodation exceeded our expectations in every way. The host's commitment to guest comfort and the stunning views were exceptional.",
      "From the moment we arrived, we were welcomed with open arms. The host's homemade breakfasts and the charming cottage made our stay special.",
      "Our experience at this property was simply magical. The host's passion for gardening and the enchanting flowers around the estate were a visual treat.",
      "Staying here was like a dream. The host's culinary expertise and the gourmet meals served at sunset made our stay extraordinary.",
      "Our stay at this place was a journey into tranquility. The host's mindfulness retreats and the serene surroundings left us refreshed.",
      "This hidden waterfront treasure was a dream for those seeking tranquility. The host's waterside meditation sessions and the soothing sounds of water made our stay a meditative escape.",
      "Our time at this property was a deep dive into the world of aquatic wonders. The host's aquatic workshops and the opportunity to witness bioluminescent phenomena were highlights of our trip.",
      "This waterfront retreat was a masterpiece of nature's beauty. The host's nature-inspired activities and the serene waterfront views for inspiration left us with memories of nature's wonders.",
      "Our experience at this waterfront property was a journey into the heart of nature. The host's water-based adventures and the opportunity to observe local wildlife in natural surroundings made our stay a naturalist's dream.",
      "Our stay by the water was a tranquil escape from the everyday hustle and bustle. The soothing sound of waves and the waterfront view created a serene and peaceful atmosphere.",
      "This waterfront retreat was a hidden gem. The host's water-based activities and the opportunity for aquatic adventures were the highlights of our stay.",
      "From the moment we arrived, we were captivated by the allure of the water. The host's private waterfront access and the chance to engage in water sports made our coastal getaway an unforgettable experience.",
      "Staying here was like having our own private beachfront paradise. The untouched shores and the crystal-clear waters right at our doorstep were a water enthusiast's dream come true.",
      "Our experience at this coastal haven was like a dream come true. The host's boat excursions and the opportunity for fishing left us with cherished memories of evenings by the water.",
      "This waterfront oasis was a haven for water lovers. The host's equipment rentals and the opportunity to explore the underwater world made our stay truly remarkable.",
      "Our stay at this waterfront property was a refreshing escape from the city's chaos. The host's water-based activities and the sounds of nature just steps away made our stay a serene retreat.",
      "This hidden waterfront paradise was a delight for nature enthusiasts. The host's guided tours and the chance to spot rare wildlife in the wetlands added to our wildlife encounters.",
      "Our time at this property was like living on a floating paradise. The host's aquatic adventures and the tranquil waters of the bay made our stay a serene and balanced experience.",
      "We had an extraordinary time at this waterside getaway. The host's water excursions and the chance to explore the beauty beneath the water's surface made our stay an aquatic adventure.",
      "Staying at this place was like having a private island retreat. The host's boat trips to neighboring islands and the opportunity to immerse in marine life made our stay an island paradise.",
      "Our stay here was a memorable journey along the water's edge. The host's romantic boat rides and the serene canals of the city made our stay a waterfront escape.",
      "This waterfront accommodation was a haven for those who appreciate the beauty of aquatic surroundings. The host's waterside picnics and the chance to watch the sunset by the water's edge left us with scenic memories.",
      "Our experience at this property was a dream come true for water enthusiasts. The host's beachcombing adventures and the chance to collect treasures by the shore made our stay a coastal delight.",
      "Our stay here was like a rejuvenating retreat. The host's water-based activities and the serene waterfront views left us with peaceful and centered memories.",
      "This hidden waterfront gem was a perfect sanctuary for those seeking tranquility. The host's waterside meditation sessions and the soothing sounds of water made our stay a meditative escape.",
      "Our time at this property was an exploration of aquatic wonders. The host's aquatic workshops and the opportunity to witness natural phenomena were highlights of our trip.",
      "This waterfront escape was a masterpiece of nature's beauty. The host's nature-inspired activities and the serene waterfront surroundings left us with memories of nature's wonders.",
      "Our experience at this waterfront property was an immersion into the heart of nature. The host's water-based adventures and the opportunity to observe local wildlife in natural settings made our stay a naturalist's dream."
  ]
  
  reservations.each do |reservation|
    review = {
      reservation_id: reservation.id,
      reviewer_id: reservation.reserver_id,
      listing_id: reservation.listing_id,  # Assign the listing_id from the reservation
      cleanliness: rand(4..5),
      accuracy: rand(4..5),
      value: rand(4..5),
      communication: rand(4..5),
      check_in: rand(4..5),
      location: rand(4..5),
      body: review_texts.sample
    }

    reviews << review
  end

  # Shuffle the reviews to randomize them and then take one review for each reservation
  reviews.shuffle!
  unique_reviews = reviews.uniq { |review| review[:reservation_id] }

  Review.create!(unique_reviews)
end

generate_reviews(reservations)

puts "Reviews created!"
reviews = Review.all
puts "Total reviews generated: #{reviews.length}"

