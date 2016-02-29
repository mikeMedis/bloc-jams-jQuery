// "use strict"; an error is called
//on the i in line 60 when using the "use strict" method. Can why talk about how we could work around this.

var albumPicasso = {
	name: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{ name: 'Blue', length: '4:26' },
		{ name: 'Green', length: '3:14' },
		{ name: 'Red', length: '5:01' },
		{ name: 'Pink', length: '3:21' },
		{ name: 'Magenta', length: '2:15' }
	]
};

var albumMarconi = {
	name: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
		{ name: 'Hello, Operator?', length: '1:01' },
		{ name: 'Ring, ring, ring', length: '5:01' },
		{ name: 'Fits in your pocket', length: '3:21' },
		{ name: 'Can you hear me now?', length: '3:14' },
		{ name: 'Wrong phone number', length: '2:15' }
	]
};

var createSongRow = function(songNumber, songName, songLength) {
	var template =
	'<tr class="album-view-song-item">'
	+ '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
	+ '  <td class="song-item-title">' + songName + '</td>'
	+ '  <td class="song-item-duration">' + songLength + '</td>'
	+ '</tr>'
	;

	return template;
};

var setCurrentAlbum = function(album) {
	var albumTitle = document.getElementsByClassName('album-view-title')[0];
	var albumArtist = document.getElementsByClassName('album-view-artist')[0];
	var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
	var albumImage = document.getElementsByClassName('album-cover-art')[0];
	var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

	albumTitle.firstChild.nodeValue = album.name;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);

	albumSongList.innerHTML = '';

	for (i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
	}
};
//use my code from the checkpoint and refactored and rearranged to find solution.
//would love to ralk on how I could make my while loop work with alerts.
var babyChild = document.getElementsByClassName('album-view-title')[0];
var classLessBaby = document.querySelector('html');

var findParentByClassName = function(element, targetClass) {
	var currentParent = element.parentElement;

	if (currentParent) {
		while (currentParent.className && currentParent.className != targetClass) {
			currentParent = currentParent.parentElement;
		}

		if (currentParent.className == targetClass) {
			return currentParent;
		} else {
			alert("Has a class just no parent.");
		}
	} else {
		alert("No parent. NOOOO!");
	}
};
//can use the provide variables to get the intended result.
findParentByClassName(classLessBaby, "not gonna work" );

//my favorite function so far found based off code from http://goo.gl/NrUzSs
//my function from stackover http://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
var findParentByClassName = function(element, searchClass){
	console.log('findParentByClassName', element);
	while((element = element.parentElement) && element.classList.contains(searchClass)){return element;}
};
	var getSongItem = function(element) {
		switch (element.className) {
			case 'album-song-button':
			case 'ion-play':
			case 'ion-pause':
			return findParentByClassName(element, 'song-item-number');
			case 'album-view-song-item':
			return element.querySelector('.song-item-number');
			case 'song-item-title':
			case 'song-item-duration':
			return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
			case 'song-item-number':
			return element;
			default:
			return;
		}
	};

	var clickHandler = function(targetElement) {
		var songItem = getSongItem(targetElement);

		if (currentlyPlayingSong === null) {
			songItem.innerHTML = pauseButtonTemplate; // getting Uncaught TypeError Cannot set prop 'innerHTML' of undefined
			currentlyPlayingSong = songItem.getAttribute('data-song-number');
		} else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
			songItem.innerHTML = playButtonTemplate;
			currentlyPlayingSong = null;
		} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
			var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
			currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
			songItem.innerHTML = pauseButtonTemplate;
			currentlyPlayingSong = songItem.getAttribute('data-song-number');
		}
	};

	var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
	var songRows = document.getElementsByClassName('album-view-song-item');

	var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
	var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

	var currentlyPlayingSong = null;

	window.onload = function() {
		setCurrentAlbum(albumPicasso);

		songListContainer.addEventListener('mouseover', function(event) {
			if (event.target.parentElement.className === 'album-view-song-item') {
				var songItem = getSongItem(event.target);

				if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
					songItem.innerHTML = playButtonTemplate;
				}
			}
		});

		for (i = 0; i < songRows.length; i++) {
			songRows[i].addEventListener('mouseleave', function(event) {
				var songItem = getSongItem(event.target);
				var songItemNumber = songItem.getAttribute('data-song-number');

				if (songItemNumber !== currentlyPlayingSong) {
					songItem.innerHTML = songItemNumber;
				}
			});
			songRows[i].addEventListener('click', function(event) {
				clickHandler(event.target);
			});
		}
	};
