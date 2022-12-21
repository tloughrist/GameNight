# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Jean-Paul Sartre', dob: 06/21/1905, pronouns: 'he/him', blurb: 'There is a contingency of human existence. It is a condemnation of their being. Their being is not determined, so it is up to everyone to create their own existence, for which they are then responsible. They cannot not be free, there is a form of necessity for freedom, which can never be given up.', username: 'jpsartre', password_digest: User.digest('proxy') },
  { name: 'Simone de Beauvoir', dob: 01/09/1908, pronouns: 'she/her', blurb: 'On ne naît pas femme, on le devient.', username: 'sdebeauvoir', password_digest: User.digest('proxy') },
  { name: 'Herbert Marcuse', dob: 07/19/1898, pronouns: 'he/him', blurb: 'The people recognize themselves in their commodities; they find their soul in their automobile, hi-fi set, split-level home, kitchen equipment.', username: 'hmarcuse', password_digest: User.digest('proxy') },
  { name: 'Maurice Merleau-Ponty', dob: 03/14/1908, pronouns: 'he/him', blurb: 'Insofar as I have hands, feet, a body, I sustain around me intentions which are not dependent on my decisions and which affect my surroundings in a way that I do not choose.', username: 'mmerleauponty', password_digest: User.digest('proxy') },
  { name: 'Franz Brentano', dob: 01/16/1838, pronouns: 'he/him', blurb: 'We could, therefore, define mental phenomena by saying that they are those phenomena which contain an object intentionally within themselves.', username: 'fbrentano', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') },
  { name: 'Albert Camus', dob: 11/07/1913, pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy') }, ])
