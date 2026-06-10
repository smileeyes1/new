import 'package:flutter/material.dart';

class AppScaffold extends StatelessWidget {
  final String? title;
  final Widget body;
  final FloatingActionButton? floatingActionButton;
  final List<Widget>? actions;
  final PreferredSizeWidget? bottom;
  final bool centerTitle;
  final Color? appBarBackgroundColor;
  final double appBarElevation;
  final Widget? leading;
  final bool automaticallyImplyLeading;
  final EdgeInsets bodyPadding;

  const AppScaffold({
    Key? key,
    this.title,
    required this.body,
    this.floatingActionButton,
    this.actions,
    this.bottom,
    this.centerTitle = true,
    this.appBarBackgroundColor,
    this.appBarElevation = 4.0,
    this.leading,
    this.automaticallyImplyLeading = true,
    this.bodyPadding = const EdgeInsets.all(16.0),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: title != null
            ? Text(
                title!,
                style: Theme.of(context).textTheme.headlineMedium,
              )
            : null,
        centerTitle: centerTitle,
        elevation: appBarElevation,
        backgroundColor: appBarBackgroundColor,
        leading: leading,
        automaticallyImplyLeading: automaticallyImplyLeading,
        actions: actions,
        bottom: bottom,
      ),
      body: Padding(
        padding: bodyPadding,
        child: body,
      ),
      floatingActionButton: floatingActionButton,
    );
  }
}
