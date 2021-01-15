<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Memento Festival Interactive Teaser Website">
    <meta name="keywords" content="memento,festival,mementofestival,kortrijk,literatuur,poezie,poëzie,proza,slam poetry,spoken word,boeken,theater,verdwalen">
    <meta name="author" content="Stijn Hellem, Veronice Muller & Milan Vanalderwerelt">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>MementoFestival - Letterdoos</title>

    <?php echo $css;?>
  </head>
  <body>
      <?php
        if(!empty($_SESSION['error'])) {
          echo '<div class="error box">' . $_SESSION['error'] . '</div>';
        }
        if(!empty($_SESSION['info'])) {
          echo '<div class="info box">' . $_SESSION['info'] . '</div>';
        }
      ?>
      <header><h1 class="hidden">De letterdoos</h1>
      <nav class="navbar" role="navigation">
          <ul class="navbar__items menu">
            <li class="items__item"><a href="index.php?page=index"><img class="logo" src="assets/img/logo.png" alt="Logo"></a></li>
            <li class="items__item"><a href="index.php?page=index2">Pagina2</a></li>
          </ul>
      </nav>
      </header>
      <main>
        <?php echo $content;?>
      </main>
    <?php echo $js; ?>
  </body>
</html>
