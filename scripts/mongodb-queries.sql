-- Exemples de requêtes MongoDB (syntaxe JavaScript)

-- 1. Rechercher des destinations par pays
                                                                                                                              db.destinations.find({ country: "France" })

-- 2. Destinations populaires triées par rating
db.destinations.find({ isPopular: true }).sort({ rating: -1 })

-- 3. Destinations dans une gamme de prix (en XOF)
db.destinations.find({ 
  price: { $gte: 300000, $lte: 800000 },
  currency: "XOF"
})

-- 4. Recherche textuelle dans les destinations
db.destinations.find({ 
  $text: { $search: "plage temple culture" }
})

-- 5. Compter les réservations par statut
db.bookings.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

-- 6. Top 5 des destinations les plus réservées
db.bookings.aggregate([
  { $group: { _id: "$destinationId", bookings: { $sum: 1 } } },
  { $sort: { bookings: -1 } },
  { $limit: 5 },
  { $lookup: {
      from: "destinations",
      localField: "_id",
      foreignField: "_id",
      as: "destination"
    }
  }
])

-- 7. Utilisateurs avec le plus de points de fidélité
db.users.find().sort({ loyaltyPoints: -1 }).limit(10)

-- 8. Revenus par mois
db.bookings.aggregate([
  { $match: { status: "confirmed", paymentStatus: "paid" } },
  { $group: {
      _id: { 
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      revenue: { $sum: "$totalPrice" },
      bookings: { $sum: 1 }
    }
  },
  { $sort: { "_id.year": -1, "_id.month": -1 } }
])
