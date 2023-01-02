users = User.create([
  { name: 'Albert Camus', dob: '1913-11-07', pronouns: 'he/him', blurb: 'Man\'s existence is absurd because his contingency finds no external justification.', username: 'acamus', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Jean-Paul Sartre', dob: '1905-06-21', pronouns: 'he/him', blurb: 'There is a contingency of human existence. It is a condemnation of their being. Their being is not determined, so it is up to everyone to create their own existence, for which they are then responsible. They cannot not be free, there is a form of necessity for freedom, which can never be given up.', username: 'jpsartre', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Simone de Beauvoir', dob: '1908-01-09', pronouns: 'she/her', blurb: 'On ne naît pas femme, on le devient.', username: 'sdebeauvoir', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Herbert Marcuse', dob: '1898-07-19', pronouns: 'he/him', blurb: 'The people recognize themselves in their commodities; they find their soul in their automobile, hi-fi set, split-level home, kitchen equipment.', username: 'hmarcuse', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Maurice Merleau-Ponty', dob: '1908-03-14', pronouns: 'he/him', blurb: 'Insofar as I have hands, feet, a body, I sustain around me intentions which are not dependent on my decisions and which affect my surroundings in a way that I do not choose.', username: 'mmerleauponty', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Franz Brentano', dob: '1838-01-16', pronouns: 'he/him', blurb: 'We could, therefore, define mental phenomena by saying that they are those phenomena which contain an object intentionally within themselves.', username: 'fbrentano', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Edmund Husserl', dob: '1859-04-08', pronouns: 'he/him', blurb: 'It is my conviction that intentional phenomenology has for the first time made spirit as spirit the field of systematic scientific experience, thus effecting a total transformation of the task of knowledge.', username: 'ehusserl', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Jacques Lacan', dob: '1901-04-13', pronouns: 'he/him', blurb: 'The Other must first of all be considered a locus in which speech is constituted.', username: 'jlacan', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Avital Ronell', dob: '1952-04-15', pronouns: 'she/her', blurb: 'Always incomplete, always unreachable, forever promising at once its essence and its existence, philosophy identifies itself finally with this promise, which is to say, with its own unreachability.', username: 'aronell', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Judith Butler', dob: '1956-02-24', pronouns: 'they/them', blurb: 'If speech depends upon censorship, then the principle that one might seek to oppose is at once the formative principle of oppositional speech.', username: 'jbutler', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Martha Nussbaum', dob: '1947-05-06', pronouns: 'she/her', blurb: 'Disgust and shame are inherently hierarchical; they set up ranks and orders of human beings.', username: 'mnussbaum', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Andrea Dworkin', dob: '1946-09-26', pronouns: 'she/her', blurb: 'Feminism is hated because women are hated. Anti-feminism is a direct expression of misogyny; it is the political defense of women hating.', username: 'adworkin', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' },
  { name: 'Jacques Derrida', dob: '1930-07-15', pronouns: 'he/him', blurb: 'Any text contains implicit hierarchies, by which an order is imposed on reality and by which a subtle repression is exercised, as these hierarchies exclude, subordinate, and hide the various potential meanings.', username: 'jderrida', password_digest: User.digest('proxy'), email: 'tim.loughrist@gmail.com' }
  ])

games = Game.create([
  { title: 'Settlers of Catan', no_players: '3-4', duration_minutes: 90, complexity: 2.31 },
  { title: 'Carcassonne', no_players: '2-5', duration_minutes: 40, complexity: 1.9 },
  { title: 'RoboRally', no_players: '2-8', duration_minutes: 60, complexity: 2.43 },
  { title: 'Dominion', no_players: '2-4', duration_minutes: 30, complexity: 2.35 },
  { title: 'The Red Dragon Inn', no_players: '2-4', duration_minutes: 45, complexity: 1.66 },
  { title: 'Betrayal at House on the Hill', no_players: '3-6', duration_minutes: 60, complexity: 2.39 },
  { title: 'Racoon Tycoon', no_players: '2-5', duration_minutes: 75, complexity: 2.1 },
  { title: 'Love Letter', no_players: '2-6', duration_minutes: 20, complexity: 1.12 },
  { title: 'Root', no_players: '2-4', duration_minutes: 75, complexity: 3.76 },
  { title: 'Zombicide: Black Plague', no_players: '1-6', duration_minutes: 120, complexity: 2.49},
  ])