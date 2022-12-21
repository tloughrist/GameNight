# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([{ name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') }, {}])
