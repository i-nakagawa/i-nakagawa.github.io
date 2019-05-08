<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Confirm</title>

</head>
<body id="confirm">
	<h1>Please confirm your entered data</h1>

	<div class="confirm">
		<p>Your Name：<?php echo $_POST['name']; ?></p>
		<p>Email Address：<?php echo $_POST['email']; ?></p>
		<p>Phone Number：<?php echo $_POST['tel']; ?></p>
		<p>How can we help?：<?php echo $_POST['type']; ?></p>
		<p>Your Message：<?php echo $_POST['message']; ?></p>
		<p>Your Favorite Number：<?php echo $_POST['number']; ?></p>

		<p>Is this correct?<br>If yes, click SEND, otherwise click BACK.</p>

		<form action="index.html">
			<button type="submit" class="btn">BACK</button>
		</form>

		<form method="post" action="insert.php">
			<button type="submit" class="btn">SEND</button>
			<input type="hidden" value="<?php echo $_POST['name']; ?>" name="name">
			<input type="hidden" value="<?php echo $_POST['email']; ?>" name="email">
			<input type="hidden" value="<?php echo $_POST['tel']; ?>" name="tel">
			<input type="hidden" value="<?php echo $_POST['type']; ?>" name="type">
			<input type="hidden" value="<?php echo $_POST['message']; ?>" name="message">
			<input type="hidden" value="<?php echo $_POST['number']; ?>" name="number">
		</form>
	</div>

</body>
</html>