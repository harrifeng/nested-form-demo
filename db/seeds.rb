# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ritz_carlton = Hotel.create(name: 'The Ritz-Carlton New York, Central Park')
mandarin_oriental = Hotel.create(name: 'Mandarin Oriental, New York')
['City View Guestroom', 'Deluxe Parkview Room'].each do |rc|
  ritz_carlton.room_categories.create(name: rc)
end
['City View Room', 'Skyline View Room', 'Hudson River View Room'].each do |rc|
  mandarin_oriental.room_categories.create(name: rc)
end
