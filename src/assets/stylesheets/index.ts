export const stylesheets: {
  container: (color: string) => {backgroundColor: string; flex: number};
  row: {flexDirection: 'row'};
  pages: {flex: number; paddingVertical: number; paddingHorizontal: number};
  content: {
    flex: number;
    paddingVertical: number;
    paddingHorizontal: number;
    paddingBottom: number;
    marginTop: number;
  };
  contentCenter: (color: string) => {
    flex: number;
    justifyContent: 'center';
    alignItems: 'center';
    backgroundColor: string;
  };
  contentCenterNoBackground: {
    flex: number;
    justifyContent: 'center';
    alignItems: 'center';
  };
  titleBold: (
    color: string,
    size?: number,
  ) => {color: string; fontSize: number; fontWeight: 'bold'};
  title: (
    color: string,
    size?: number,
  ) => {color: string; fontSize: number; fontWeight: '600'};
  titleCenter: (
    color: string,
    size?: number,
  ) => {
    color: string;
    fontSize: number;
    fontWeight: '600';
    textAlign: 'center';
  };
  contentFloatingBottom: {
    position: 'absolute';
    bottom: number;
    left: number;
    right: number;
    alignItems: 'flex-end';
  };
  containerFlex: {flex: number};
} = {
  container: color => ({
    backgroundColor: color,
    flex: 1,
  }),
  row: {flexDirection: 'row'},
  pages: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    paddingBottom: 0,
    marginTop: 50,
  },
  contentCenter: color => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
  }),
  contentCenterNoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBold: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 16 : size,
    fontWeight: 'bold',
  }),
  title: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 14 : size,
    fontWeight: '600',
  }),
  titleCenter: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 14 : size,
    fontWeight: '600',
    textAlign: 'center',
  }),
  contentFloatingBottom: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    alignItems: 'flex-end',
  },
  containerFlex: {flex: 1},
};
