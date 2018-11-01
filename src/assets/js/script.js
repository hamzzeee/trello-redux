import $ from 'jquery';

$(function () {

	//  show list
	$("#add-list").click (function () {
		$("#list-section").show();
		$(".add-list-wrap").hide();
		return false;
	})
	// hide list
	$(".hide-list").click (function () {
		$(this).parents('.close-contain').hide();
		$(".add-list-wrap").show();
		return false;
	})


	//  add anotehr card 
	$(".addAnotherCard").click (function () {
		$(".addAnotherWrap").hide();
		$(".addAnotherInfo").show();
		return false;
	});
	$(".hideAnother").click (function () {
		$(".addAnotherWrap").show();
		$(".addAnotherInfo").hide();
		return false;
	});


})