<template>
  <div class="home">
    <h1>Welcome to Kitchen - Insta Menu</h1>
    <p>
      Look no further, the best foodie app is now available at your fingertips. I've compiled a list of the best restaurant eats in the city of Edmonton that is literally a click away with our quick delivery service included! Everything comes prepared for the best dining experience. Perfect for date nights, family gatherings, and holidays.
      During the pandemic, we learned that hosting smaller gatherings reduced the risk of infection. After the pandemic, we created InstaMenu, a catering service that brings the restaurant to your front door. All of these restaurants don't offer delivery through common apps like Skip the Dish, Uber Eats, or DoorDash, as these particular restaurants want to give you a personalized experience similar to what they offer in their dining rooms, bars, and lounges. Meals are provided with superior tableware for easy setup once delivered with the utmost care. We fully have confidence in this service that we provide a 20% discount off your first order.  
    </p>

    <h2 class="section-title"><u>Just Added</u></h2>
    <ul class="restaurant-list">
      <li>
        <img alt="FU's Repair Shop" src="@/assets/fu.png" class="logo">
        <div class="restaurant-info">
          <a href="https://www.fusrepairshop.ca/" target="_blank" rel="noopener">FU'S REPAIR SHOP</a>
          <p>Cocktails, all-day dim sum, dumplings, wok-fried dishes, and more.</p>
        </div>
      </li>

      <li>
        <img alt="TIKI TIKI" src="@/assets/tiki.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://tikitiki.ca/" target="_blank" rel="noopener">TIKI TIKI</a>
          <p>Polynesian fusion/modern gastropub. Enjoy a pop-up RAW bar, craft cocktails & delicious food.</p>
        </div>
      </li>
    </ul>
    <hr class="divider" />

    <h2 class="section-title"><u>Trending Restaurants</u></h2>
    <ul class="restaurant-list">
      <li>
        <img alt="PARTAKE" src="@/assets/partake.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://www.ouipartake.com/" target="_blank" rel="noopener">PARTAKE</a>
          <p>Combining hearty, rustic French cuisine with a cozy & welcoming neighbourhood atmosphere, Partake is a place to revisit old friends and meet new ones.</p>
        </div>
      </li>

      <li>
        <img alt="LEOPARD PIZZA" src="@/assets/leopard.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://www.leopardyeg.com/" target="_blank" rel="noopener">LEOPARD PIZZA</a>
          <p>Leopard is a modern bar and pizzeria in the West Block development, located in Edmonton’s Glenora neighbourhood. Brought to you by the folks from Bar Clementine and Woodwork.</p>
        </div>
      </li>

      <li>
        <img alt="LUNA COCINA MEXICANA" src="@/assets/luna.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://www.lunamexicanrestaurant.ca/" target="_blank" rel="noopener">LUNA COCINA MEXICANA</a>
          <p>Destination for wide-ranging Mexican comfort food & margaritas served in vibrant surrounds.</p>
        </div>
      </li>

      <li>
        <img alt="SABOR" src="@/assets/SABOR.png" class="logo">
        <div class="restaurant-info">
          <a href="https://sabor.ca/" target="_blank" rel="noopener">SABOR</a>
          <p>Located in the historic Boardwalk Building in Edmonton’s Ice District for nearly 15 years and counting – SABOR features authentic Portuguese and Spanish cuisine, timeless Iberian dishes featuring local ingredients, family-style platters and modern techniques. </p>
        </div>
      </li>

      <li>
        <img alt="DOSC" src="@/assets/DOSC.jpeg" class="logo">
        <div class="restaurant-info">
          <a href="https://dosc.ca/" target="_blank" rel="noopener">DOSC</a>
          <p>Funky local option for informal daytime dining, freshly mixed cocktails & a range of steaks.</p>
        </div>
      </li>
    </ul>
    <hr class="divider" />

    <h2 class="section-title"><u>My Top 3 Restaurant Picks</u></h2>
    <ul class="restaurant-list">
      <li>
        <img alt="SUSHI BY VIHN" src="@/assets/sushibyvin.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://www.mercedes-benz-heritagevalley.ca/omakase-sushi-by-vinh/" target="_blank" rel="noopener">SUSHI BY VIHN</a>
          <p>The Omakase Room was built as a collaboration between Mercedes-Benz Heritage Valley and Vinh Tran of Sushi by Vinh to showcase the culinary art of sushi, and represent the finest in luxury automotive. It is located in the basement of Mercedes-Benz Heritage Valley, as a part of the AMG Lounge; a space dedicated to immersing oneself in the culture and lifestyle of Mercedes-Benz.</p>
        </div>
      </li>

      <li>
        <img alt="EL CORAZON" src="@/assets/el.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://elcorazonyeg.com/" target="_blank" rel="noopener">EL CORAZON</a>
          <p>At El Corazón “The Heart”, we are influenced by Latin flavours to offer a unique dining experience with vibrant cocktails + inspired food.</p>
        </div>
      </li>

      <li>
        <img alt="CHI & EM" src="@/assets/chi.jpg" class="logo">
        <div class="restaurant-info">
          <a href="https://www.instagram.com/chiandem.asianbistro/?hl=en" target="_blank" rel="noopener">CHI & EM</a>
          <p>An epic culinary experience unlike anything else in Edmonton, the best of traditional dishes with new and unique twists.</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

p {
  margin-bottom: 30px;
}

.section-title {
  margin: 40px 0 0;
}

.restaurant-list {
  list-style-type: none;
  padding: 0;
}

.restaurant-list li {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.logo {
  max-width: 180px;
  height: auto;
  margin-right: 20px;
}

.restaurant-info {
  flex: 1;
}

a {
  color: #020202;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #FFDB58;
}

.divider {
  margin-top: 40px;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
