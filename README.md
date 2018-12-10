# hecho
Show you're proud of where you build your product by adding a simple element and script to your site.

#Usage
```html
<hecho locale="es" country="AR" />
<hecho locale="es" country="AR" lenght="short" />
<hecho locale="en" country="CA" />
<script src="https://cdn.jsdelivr.net/gh/Urucas/hecho@master/dist/hecho.js"></script>
```

#Result
<img src="https://raw.githubusercontent.com/Urucas/hecho/master/screen.png"/>

#Styling
Every ```<hecho>``` element will have as a child a ```<div>``` element with to classes:

* hecho-$index 
* hecho-$country

For ex.
```html```
<hecho locale="es" country="AR"></hecho>
```
would have a ```<div>``` child with to classes **hecho-0** **hecho-AR**

Now you can add your own style in our stylesheet like
```css
.hecho-AR{
  font-style:'Helvetica Neue'
  font-size:0.8em
}
```
